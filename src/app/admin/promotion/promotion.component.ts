import { Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent {
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

  constructor(private _api: ApiService) {}
  ngOnInit(): void {
    this.formsearch = new FormGroup({
      discountId : new FormControl(),
    })
    this.search();
  }
  loadPage(page: number) {
    this.pageSize = 5;
    var dataSearch = {
      page: page,
      pageSize: this.pageSize,
      discountId: this.formsearch.value.discountId,
    };
    this._api.post('KhuyenMai/Search', dataSearch).subscribe((res) => {
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
      discountId: this.formsearch.value.discountId,
    };
    this._api.post('KhuyenMai/Search', dataSearch).subscribe((res) => {
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
    setTimeout(() =>{
      $('#createUserModal').modal('toggle');
      this.formdata = new FormGroup({
        ngayAD: new FormControl(Date.now),
        ngayKT: new FormControl(Date.now),
        tiLeKM: new FormControl(''),
        discountId: new FormControl(''),
      });
      this.doneSetupForm = true;
    });
  }
  updateModal(item: any) {
    const ngayADDate = new Date(item.ngayAD);
    ngayADDate.setDate(ngayADDate.getDate() + 1);
    const ngayADValue = ngayADDate.toISOString().split('T')[0];
    const ngayKTDate = new Date(item.ngayKT);
    ngayKTDate.setDate(ngayKTDate.getDate() + 1);
    const ngayKTValue = ngayKTDate.toISOString().split('T')[0];
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = new FormGroup({
        id: new FormControl(item.id),
        ngayAD: new FormControl(ngayADValue),
        ngayKT: new FormControl(ngayKTValue),
        tiLeKM: new FormControl(item.tiLeKM),
        discountId: new FormControl(item.discountId),
      });
      this.doneSetupForm = true;
    });
  }
  async onSubmit(obj, id) {
    this.submitted = true;
    console.log(obj);
    if (this.formdata.invalid) {
      return;
    }
    if (this.isCreate) {
      obj.id = 0;
      await this._api.post('KhuyenMai/Create', obj).subscribe((res) => {
        if (res.success) {
          alert('Thêm thành công');
          this.closeModal(id);
          this.search();
        } else {
          console.log(res);
          alert('Có lỗi xảy ra!')
        }
      });
    } else {
      await this._api.put('KhuyenMai/Update/' + obj.id, obj).subscribe((res) => {
        if (res.success) {
          alert('Sửa thành công!');
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
    this._api.delete('KhuyenMai/Delete' + this.id).subscribe((res) => {
      if (res.success) {
        alert('Xóa thành công');
        this.id = 0;
        this.closeModal('confirmDeleteModal');
        this.search();
      } else {
        alert('Có lỗi xảy ra !');
      }
    });
  }
  closeModal(id: any) {
    $(`#${id}`).modal('hide');
  }
}
