import { Component } from '@angular/core';
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
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {
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
  public isUpdateDetail: boolean = false;
  public items: any;
  public bill: any;
  public id = 0;
  public order: any;
  public imageURL = '';
  public staff;
  idSP: any;
  constructor(private _api: ApiService) {}
 async ngOnInit(): Promise<void> {
    this.formsearch = new FormGroup({
    });
    this.staff = JSON.parse(localStorage.getItem("staff")!)
    this.search();
  }
  loadPage(page: number) {
    this.pageSize = 5;
    var dataSearch = {
      page: page,
      pageSize: this.pageSize,
    };
    this._api.post('HDBan/Search', dataSearch).subscribe((res) => {
      this.bill = res.data.data;
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
    };

    this._api.post('HDBan/Search', dataSearch).subscribe((res) => {
      this.bill = res.data.data;
      this.currentPage = res.data.page;
      this.pageSize = res.data.pageSize;
      this.totalItems = res.data.totalItem;
    });
  }
  formatNote(obj : string){
    let regex = /\b\d{9,10}\b/g;
    var note = obj.match(regex);
    return note;
  }
  async updateModal(item: any) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    this.order = item;
    setTimeout(async () => {
      this.formdata = new FormGroup({
        id: new FormControl(item.id),
        idNV: new FormControl(this.staff.maNguoiDung),
        tinhTrangDH: new FormControl(item.tinhTrangDH ? item.tinhTrangDH : 11),
        email : new FormControl(item)
      });
      $('#createUserModal').modal('toggle');
    });
  }

  async onSubmit(obj, id) {
    this.order.tinhTrangDH = Number(obj.tinhTrangDH)
    console.log(this.order.tinhTrangDH);

    if(this.order.tinhTrangDH == 21){
      await this._api.post('HDBan/SendMail?email='+this.order.email, this.order).subscribe((res) => {})
    }
    await this._api.put('HDBan/Update/'+this.order.id, this.order).subscribe(async (res) => {
      if (res.success) {
        alert('Sửa thông tin thành công');
        this.closeModal(id)
        this.search()
      } else {
        alert('Có lỗi xảy ra!');
      }
    });
  }

  deleteModal(id)
  {
    this.id = id
    $('#confirmDeleteModal').modal('toggle');
  }
  confirmDelete() {
    this._api.delete('HDBan/Delete/' + this.id).subscribe((res) => {
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
  loadImage(url) {
    return 'https://localhost:7064/api/File/ReadFile?path=' + url;
  }
  closeModal(id: any) {
    $(`#${id}`).modal('hide');
  }
}
