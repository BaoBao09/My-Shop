import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  public isCreate: any;
  public showUpdateModal: boolean = false;
  public doneSetupForm: boolean = false;
  public formsearch: any;
  public page: number = 1;
  public pageSize: number = 5;
  public totalItems: number = 10;
  public currentPage = 1;
  public formdata: any;
  public submitted: boolean = false;
  public items : any;
  public id = 0;
  constructor(private _api: ApiService) {}
  ngOnInit(): void {
    this.formsearch = new FormGroup({
      tenLoai: new FormControl(),
    });

    this.search();
  }
  loadPage(page: number) {
    this.pageSize = 5;
    var dataSearch = {
      page: page,
      pageSize: this.pageSize,
      tenLoai: this.formsearch.value.tenLoai,
    };
    this._api.post('LoaiSP/Search', dataSearch).subscribe((res) => {
      console.log(res);

      this.items = res.data.data;
      this.currentPage = res.data.page;
      this.totalItems = res.data.total;
    });
  }
  search() {
    this.page = 1;
    this.pageSize = 5;
    var dataSearch = {
      page: this.page,
      pageSize: this.pageSize,
      tenLoai: this.formsearch.value.tenLoai,
    };
    this._api.post('LoaiSP/Search', dataSearch).subscribe((res) => {
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
        tenLoai: new FormControl('', Validators.required),
        moTa: new FormControl(''),
      });
      this.doneSetupForm = true;
    });
  }
  updateModal(item: any) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = new FormGroup({
        id: new FormControl(item.id),
        tenLoai: new FormControl(item.tenLoai, Validators.required),
        moTa: new FormControl(item.moTa),
      });
      this.doneSetupForm = true;
    });
  }
  async onSubmit(obj, id) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if (this.isCreate) {
      obj.id = 0;
      obj.trangThai = true;
      await this._api.post('LoaiSP/Create', obj).subscribe((res) => {
        if (res.success) {
          alert('Thêm thành công');
          this.closeModal(id)
          this.search()
        } else {
          alert('Có lỗi xảy ra!');
        }
      });
    } else {
      obj.trangThai = true;
      await this._api.put('LoaiSP/Update/'+obj.id, obj).subscribe((res) => {
        if (res.success) {
          alert('Sửa thành công');
          this.closeModal(id)
          this.search()
        } else {
          alert('Có lỗi xảy ra!');
        }
      });
    }
  }
  deleteModal(id)
  {
    this.id = id
    $('#confirmDeleteModal').modal('toggle');
  }
  confirmDelete() {
    this._api.delete('LoaiSP/Delete/' + this.id).subscribe((res) => {
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
  closeModal(id:any) {
    $(`#${id}`).modal('hide');
  }
}
