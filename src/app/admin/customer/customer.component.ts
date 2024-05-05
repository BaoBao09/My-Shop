import { Component} from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
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
  public items: any;
  public id = 0;
  // createForm: FormGroup<any> | undefined;

  constructor(private _api: ApiService) {}
  ngOnInit(): void {
    this.formsearch = new FormGroup({
      hoTen: new FormControl(),
      email: new FormControl(),
    });

    this.search();
  }
  loadPage(page: number) {
    this.pageSize = 5;
    var dataSearch = {
      page: page,
      pageSize: this.pageSize,
      hoTen: this.formsearch.value.hoTen,
      email: this.formsearch.value.email,
    };
    this._api.post('KhachHang/Search', dataSearch).subscribe((res) => {
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
      hoTen: this.formsearch.value.hoTen,
      email: this.formsearch.value.email,
    };
    this._api.post('KhachHang/Search', dataSearch).subscribe((res) => {
      this.items = res.data.data;
      this.currentPage = res.data.page;
      this.pageSize = res.data.pageSize;
      this.totalItems = res.data.totalItem;
      console.log(this.totalItems);
    });
  }
  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = new FormGroup({
        hoTen: new FormControl('', Validators.required),
        soDT: new FormControl(''),
        email: new FormControl('', Validators.required),
        gioiTinh: new FormControl(true, Validators.required),
        ngaySinh: new FormControl(Date.now),
      });
      this.doneSetupForm = true;
    });
  }
  updateModal(item: any) {
    const ngaySinhDate = new Date('2024-04-01T00:00:00');
    ngaySinhDate.setDate(ngaySinhDate.getDate() + 1);
    const ngaySinhValue = ngaySinhDate.toISOString().split('T')[0];
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = new FormGroup({
        id: new FormControl(item.id),
        hoTen: new FormControl(item.hoTen, Validators.required),
        soDT: new FormControl(item.soDT),
        email: new FormControl(item.email),
        gioiTinh: new FormControl(item.gioiTinh, Validators.required),
        ngaySinh: new FormControl(ngaySinhValue),
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
      await this._api.post('KhachHang/Create', obj).subscribe((res) => {
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
      await this._api
        .put('KhachHang/Update/' + obj.id, obj)
        .subscribe((res) => {
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
    this._api.delete('KhachHang/Delete/' + this.id).subscribe((res) => {
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
  closeModal(id: any) {
    $(`#${id}`).modal('hide');
  }
}
