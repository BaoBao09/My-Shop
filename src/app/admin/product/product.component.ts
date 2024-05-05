import { Component, Injector, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  Validators,
  Form,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  public isCreate: any;
  public showUpdateModal: boolean = false;
  public doneSetupForm: boolean = false;
  public formsearch: any;
  public page: number = 1;
  public pageSize: number = 5;
  public totalItems: number = 10;
  public currentPage = 1;
  public formdata: any;
  public formDetail: any;
  public submitted: boolean = false;
  public items: any;
  public categories: any;
  public id = 0;
  public sizes = ['S', 'M', 'L', 'XL'];
  public colors = ['Trắng', 'Đen', 'Nâu', 'Vàng', 'Xám'];
  public materials = ['Trắng', 'Đen', 'Nâu', 'Vàng', 'Xám'];
  public labels = ['Trắng', 'Đen', 'Nâu', 'Vàng', 'Xám'];
  public productDetails: any = [];
  constructor(private _api: ApiService) {}
  ngOnInit(): void {
    this.formsearch = new FormGroup({
      tenSP: new FormControl(),
      thuongHieu: new FormControl(),
    });
    this._api.get('LoaiSP/GetAll').subscribe((res) => {
      if (res.success) {
        this.categories = res.data;
      }
    });
    this.search();
  }
  loadPage(page: number) {
    this.pageSize = 5;
    var dataSearch = {
      page: page,
      pageSize: this.pageSize,
      tenSP: this.formsearch.value.tenSP,
      thuongHieu: this.formsearch.value.thuongHieu,
    };
    this._api.post('SanPham/Search', dataSearch).subscribe((res) => {
      this.items = res.data.data;
      this.currentPage = res.data.page;
      this.totalItems = res.data.totalItem;
    });
  }
  search() {
    this.page = 1;
    this.pageSize = 5;
    var dataSearch = {
      page: this.page,
      pageSize: this.pageSize,
      tenSP: this.formsearch.value.tenSP,
      thuongHieu: this.formsearch.value.thuongHieu,
    };

    this._api.post('SanPham/Search', dataSearch).subscribe((res) => {
      this.items = res.data.data;
      this.currentPage = res.data.page;
      this.pageSize = res.data.pageSize;
      this.totalItems = res.data.totalItem;
    });
  }
  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = new FormGroup({
        idloaiSP: new FormControl(0),
        tenSP: new FormControl('', Validators.required),
        moTa: new FormControl(''),
        chatLieu: new FormControl('', Validators.required),
        thuongHieu: new FormControl('', Validators.required),
        gia: new FormControl(''),
        hinhAnh: new FormControl(),
      });
      this.formDetail = new FormGroup({
        size: new FormControl(''),
        mauSac: new FormControl(''),
        soLuong: new FormControl(''),
        hinhAnh: new FormControl(),
      });
      this.doneSetupForm = true;
      this.productDetails = [];
    });
  }
  updateModal(item: any) {
    console.log(item);
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    this.productDetails = item.cTSPhams;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = new FormGroup({
        id: new FormControl(item.id),
        idloaiSP: new FormControl(item.idloaiSP),
        tenSP: new FormControl(item.tenSP, Validators.required),
        moTa: new FormControl(item.moTa),
        chatLieu: new FormControl(item.chatLieu),
        thuongHieu: new FormControl(item.thuongHieu),
        gia: new FormControl(item.gia),
        hinhAnh: new FormControl(item.hinhAnh),
      });
      this.doneSetupForm = true;
      this.productDetails = item.cTSPhams;
    });
  }
  addDetail(detail: any) {
    this.productDetails.push(detail);
  }
  updateDetail(detail: any) {
    this.formDetail = new FormGroup({
      size: new FormControl(detail.size),
      mauSac: new FormControl(detail.mauSac),
      soLuong: new FormControl(detail.soLuong),
      hinhAnh: new FormControl(detail.hinhAnh),
    });
  }
  deleteDetal(id) {
    this.productDetails.splice(id, 1);
  }
  async onSubmit(obj, id) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if (this.isCreate) {
      obj.id = 0;
      obj.trangThai = true;
      await this._api.post('SanPham/Create', obj).subscribe((res) => {
        if (res.success) {
          alert('Thêm thành công');
          this.closeModal(id);
          this.search();
        } else {
          alert('Có lỗi xảy ra!');
        }
      });
    } else {
      obj.trangThai = true;
      await this._api.put('SanPham/Update/' + obj.id, obj).subscribe((res) => {
        if (res.success) {
          alert('Sửa thành công');
          this.closeModal(id);
          this.search();
        } else {
          alert('Có lỗi xảy ra!');
        }
      });
    }
  }
  deleteModal(id) {
    this.id = id;
    $('#confirmDeleteModal').modal('toggle');
  }
  confirmDelete() {
    this._api.delete('SanPham/Delete/' + this.id).subscribe((res) => {
      if (res.success) {
        alert('Xóa thành công');
        this.id = 0;
        this.closeModal('confirmDeleteModal');
        this.search();
      } else {
        alert('Có lỗi xảy ra!');
      }
    });
  }
  async uploadFile(fileInput) {
    const file : Blob = fileInput.files[0];
    const formData = new FormData();
    
    formData.append('f', file);
    await this._api.uploadFile('KhachHang/Upload', formData).subscribe((res) => {
      if (res.success) {
        alert(res.data);
      }
    });
  }
  closeModal(id: any) {
    $(`#${id}`).modal('hide');
  }
}
