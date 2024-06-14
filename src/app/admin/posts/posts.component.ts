import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
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
  public imageURL = '';
  constructor(private _api: ApiService) {}
  ngOnInit(): void {
    this.formsearch = new FormGroup({
      tieuDe: new FormControl(),
    });

    this.search();
  }
  loadPage(page: number) {
    this.pageSize = 5;
    var dataSearch = {
      page: page,
      pageSize: this.pageSize,
      tieuDe: this.formsearch.value.tieuDe,
    };
    this._api.post('BaiViet/Search', dataSearch).subscribe((res) => {
      this.items = res.data.data;
      this.currentPage = res.data.page;
      this.pageSize = res.data.pageSize;
      this.totalItems = res.data.totalItem;
    });
  }
  search() {
    this.page = 1;
    this.pageSize = 5;
    var dataSearch = {
      page: this.page,
      pageSize: this.pageSize,
      tieuDe: this.formsearch.value.tieuDe,
    };
    this._api.post('BaiViet/Search', dataSearch).subscribe((res) => {
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
        tieuDe: new FormControl(''),
        ngayViet : new FormControl(Date.now),
        hinhAnh : new FormControl(''),
      });
      this.doneSetupForm = true;
    });
  }
  updateModal(item: any) {
    const ngayVietDate = new Date(item.ngayViet);
    ngayVietDate.setDate(ngayVietDate.getDate() + 1);
    const ngayVietValue = ngayVietDate.toISOString().split('T')[0];
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = new FormGroup({
        id : new FormControl(item.id),
        tieuDe: new FormControl(item.tieuDe),
        ngayViet : new FormControl(ngayVietValue),
        hinhAnh : new FormControl(item.hinhAnh? item.hinhAnh : ""),
      });
      this.doneSetupForm = true;
    });
  }
  async onSubmit(obj, id, fileInput) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if (fileInput.files[0]) {
      await this.uploadDetailImage(fileInput);
      obj.hinhAnh = this.imageURL;
    }
    console.log(obj);

    if (this.isCreate) {
      obj.id = 0;
      obj.trangThai = true;
      await this._api.post('Baiviet/Create', obj).subscribe((res) => {
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
        .put('BaiViet/Update/' + obj.id, obj)
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
    this._api.delete('BaiViet/Delete/' + this.id).subscribe((res) => {
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
  async uploadDetailImage(fileInput) {
    this.imageURL = '';
    const file = fileInput.files![0];

    const formData = new FormData();
    formData.append('f', file);
    const res = await this._api
      .uploadFile('File/Upload/Post', formData)
      .toPromise();
    if (res.success) {
      this.imageURL = res.data;
    }
  }
  loadImage(url) {
    return 'https://localhost:7064/api/File/ReadFile?path=' + url;
  }
}
