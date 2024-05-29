import { Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent {
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
  public imageURL = '';

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
    this._api.post('NhanVien/Search', dataSearch).subscribe((res) => {
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
    this._api.post('NhanVien/Search', dataSearch).subscribe((res) => {
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
        ngaySinh: new FormControl(Date.now),
        quyen: new FormControl(''),
        tenNh: new FormControl(''),
        soTk: new FormControl(''),
        avatar: new FormControl(''),
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
        ngaySinh: new FormControl(ngaySinhValue),
        quyen: new FormControl(item.quyen),
        tenNh: new FormControl(item.tenNh),
        soTk: new FormControl(item.soTk),
        avatar: new FormControl(item.avatar),
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
      obj.password = "123";
      obj.trangThai = true;
      await this._api.post('NhanVien/Create', obj).subscribe((res) => {
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
        .put('NhanVien/Update/' + obj.id, obj)
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
    this._api.delete('NhanVien/Delete/' + this.id).subscribe((res) => {
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
  async uploadFile(id) {
    this.imageURL = '';
    const fileInput =
      document.querySelector<HTMLInputElement>('input[type=file]')!;
    const file = fileInput.files![0];
    console.log(fileInput.files);

    const formData = new FormData();
    formData.append('f', file);
    const res = await this._api
      .uploadFile('File/Upload/Avatar', formData)
      .toPromise();
    if (res.success) {
      this.imageURL = res.data;
    }
  }
  loadImage(url) {
    return 'https://localhost:7064/api/File/ReadFile?path=' + url;
  }
}
