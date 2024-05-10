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
  public materials = ['Cotton', 'Vải thun', 'Kaki', 'Ruby', 'Lanh', 'Da PU'];
  public labels = ['Zenkonu', 'LOURENTS', 'FELIE DRESS', 'Vans', 'Louis Vuitton', 'FABUMAN'];
  public productDetails: Array<any> = [];
  public imageURL = '';
  idSP: any;
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
        gia: new FormControl(0),
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
    this.idSP = item.id
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    this.productDetails = item.cTSPhams;
    setTimeout(async () => {
      $('#createUserModal').modal('toggle');
      this.formdata = new FormGroup({
        id: new FormControl(item.id),
        idloaiSP: new FormControl(item.idLoaiSP),
        tenSP: new FormControl(item.tenSP, Validators.required),
        moTa: new FormControl(item.moTa),
        chatLieu: new FormControl(item.chatLieu),
        thuongHieu: new FormControl(item.thuongHieu),
        gia: new FormControl(item.gia),
        hinhAnh: new FormControl(item.hinhAnh),
        hinhAnh1: new FormControl(item.hinhAnh1),
      });
      const res = await this._api
      .get('ChiTietSP/GetByIdSP/' + item.id)
      .toPromise();
      this.productDetails = res.data;
      this.doneSetupForm = true;
      this.formDetail = new FormGroup({
        size: new FormControl(''),
        mauSac: new FormControl(''),
        soLuong: new FormControl(''),
        hinhAnh: new FormControl(),
      });
    });
  }
  async addDetail(detail: any, addDetail) {
    await this.uploadDetailImage(addDetail);
    detail.id = 0;
    detail.idSanPham = this.idSP;
    detail.trangThai = true;
    detail.hinhAnh = this.imageURL;
    await this._api.post('ChiTietSP/Create', detail).subscribe((res) => {
      console.log(res);

    })
    if (this.productDetails && Array.isArray(this.productDetails)) {
      this.productDetails.push(detail);
    }
  }
  updateDetail(detail: any, fileInput) {
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
    obj.idloaiSP = this.formdata.get("idloaiSP").value
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if (this.isCreate) {
      obj.id = 0;
      obj.trangThai = true;
      await this.uploadFile(0);
      console.log(this.imageURL);
      obj.hinhAnh1 = this.imageURL;

      await this._api.post('SanPham/Create', obj).subscribe((res) => {
        if (res.success) {
          alert('Thêm thành công');
          this.closeModal(id);
          this.search();
        } else {
          alert('Có lỗi xảy ra!');
        }
      });
    }

    else {
      obj.trangThai = true;
      obj.cTSPhams = this.productDetails
      console.log(obj);
      // await this._api.put('SanPham/Update/' + obj.id, obj).subscribe((res) => {
      //   if (res.success) {
      //     alert('Sửa thành công');
      //     this.closeModal(id);
      //     this.search();
      //   } else {
      //     alert('Có lỗi xảy ra!');
      //   }
      // });
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
  async uploadFile(id) {
    this.imageURL = '';
    const fileInput =
      document.querySelector<HTMLInputElement>('input[type=file]')!;
    const file = fileInput.files![0];
    console.log(fileInput.files);

    const formData = new FormData();
    formData.append('f', file);
    const res = await this._api
      .uploadFile('File/Upload/Product', formData)
      .toPromise();
    if (res.success) {
      this.imageURL = res.data;
    }
  }
  async uploadDetailImage(fileInput) {
    this.imageURL = '';
    const file = fileInput.files![0];
    console.log(fileInput.files);

    const formData = new FormData();
    formData.append('f', file);
    const res = await this._api
      .uploadFile('File/Upload/Product', formData)
      .toPromise();
    if (res.success) {
      this.imageURL = res.data;
    }
  }
  loadImage(url) {
    return 'https://localhost:7064/api/File/ReadFile?path=' + url;
  }
  closeModal(id: any) {
    $(`#${id}`).modal('hide');
  }
}
