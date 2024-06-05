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
  public khachhangs: any;
  public id = 0;
  public productDetails: Array<any> = [];
  public imageURL = '';
  idSP: any;
  constructor(private _api: ApiService) {}
 async ngOnInit(): Promise<void> {
    this.formsearch = new FormGroup({
    });
    this.khachhangs = (await this._api.get('KhachHang/GetAll').toPromise()).data
    // this._api.get('HDBan/GetAll').subscribe((res) => {
    //   if (res.success) {
    //     this.bill = res.data;
    //   }
    // });



    // this._api.get('KhachHang/GetAll').subscribe((res) => {
    //   if (res.success) {
    //     this.khachhangs = res.data;
    //   }
    // });
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

  updateModal(item: any) {
    console.log(item);
    this.idSP = item.id;
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
      this.productDetails = item.data;
    });
  }

  async onSubmit(obj, id) {

  }

  deleteModal(id)
  {
    this.id = id
    $('#confirmDeleteModal').modal('toggle');
  }
  confirmDelete() {

  }
  loadImage(url) {
    return 'https://localhost:7064/api/File/ReadFile?path=' + url;
  }
  closeModal(id: any) {
    $(`#${id}`).modal('hide');
  }
}
