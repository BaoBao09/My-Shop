import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent {
  public isUpdateModal = false;
  public khachHang: any;
  public cart: any;
  public addresses: any;
  public formdata: any;
  public selectedAddress: any;
  public hdban: any;
  public qr = '';
  idDelete: any;
  idAddress: any;
  public isDeleteModal = true;
  constructor(private _api: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.khachHang = JSON.parse(localStorage.getItem('user')!);
    this.cart = JSON.parse(sessionStorage.getItem('cartPayment')!);

    if (this.khachHang) {
      this.loadData();
      this.resetForm();
      this.hdban = new FormGroup({
        idKH: new FormControl(this.khachHang.id),
        idNV: new FormControl(0),
        idDiaChi: new FormControl(0),
        ghiChu: new FormControl(''),
        khuyenMai: new FormControl(0),
        ngayTao: new FormControl(new Date().toJSON()),
        tongTien: new FormControl(this.cart.totalPayment),
        tinhTrangDH: new FormControl('11'),
        trangThai: new FormControl(true),
      });
    } else {
      this.router.navigate(['/login', { queryParams: 'check-out' }]);
    }
  }
  loadData() {
    this._api.get('DiaChi/GetByIdKH/' + this.khachHang.id).subscribe((res) => {
      if (res.success) {
        this.addresses = res.data;
        this.selectedAddress = this.addresses[0];
      }
    });
  }
  showName(name: any) {
    if (name.length >= 20) return name.slice(0, 20) + '...';
    else return name;
  }
  changeAddress() {
    setTimeout(() => {
      $('#addressModal').modal('toggle');
      this.resetForm();
    });
  }
  resetForm() {
    this.isUpdateModal = false;
    this.formdata = new FormGroup({
      id: new FormControl(0),
      idKH: new FormControl(this.khachHang.id),
      nguoiNhan: new FormControl('', Validators.required),
      soDT: new FormControl('', Validators.required),
      diaChiNH: new FormControl('', Validators.required),
    });
  }
  updateModal(item) {
    this.isUpdateModal = true;
    this.formdata = new FormGroup({
      id: new FormControl(item.id),
      //idKH: new FormControl(item.idKH),
      nguoiNhan: new FormControl(item.nguoiNhan, Validators.required),
      soDT: new FormControl(item.soDT, Validators.required),
      diaChiNH: new FormControl(item.diaChiNH, Validators.required),
    });
  }
  closeModal(id) {
    $(`#${id}`).modal('hide');
  }
  onSubmit(item) {
    if (this.isUpdateModal) {
      this._api.put('DiaChi/Update/' + item.id, item).subscribe((res) => {
        if (res.success) {
          this.loadData();
        }
      });
    } else {
      this._api.post('DiaChi/Create', item).subscribe((res) => {
        if (res.success) {
          this.loadData();
        }
      });
    }
  }

  showDeleteModal(id) {
    this.idDelete = id;
    this.isDeleteModal = true;
    $('#confirmModal').modal('toggle');
  }
  showConfirmModal(id) {
    this.idAddress = id;
    this.isDeleteModal = false;
    $('#confirmModal').modal('toggle');
  }
  confirmDelete() {
    console.log(this.idDelete);
    this._api.delete('DiaChi/Delete?id=' + this.idDelete).subscribe((res) => {
      if (res.success) {
        this.idDelete = 0;
        this.loadData();
      }
    });
    $(`#confirmModal`).modal('hide');
  }
  confirmSelect() {
    this.selectedAddress = this.idAddress;
    $(`#confirmModal`).modal('hide');
    $(`#addressModal`).modal('hide');
  }
  handleCheckout(value) {
    const date = new Date();
    let code =
      '' +
      date.getDate() +
      date.getMonth() +
      date.getFullYear() +
      11 +
      this.khachHang.id;
    value.idDiaChi = this.selectedAddress.id;
    value.ghiChu = value.ghiChu + '**' + code + '**';

    this._api.post('HDBan/Create', value).subscribe((res) => {
      if (res.success) {
        let cthdb;
        this.cart.cTGHangs.forEach((e) => {
          cthdb = {
            idHDBan: res.data.id,
            idCTSPham: e.idCTSP,
            soLuong: e.soLuong,
          };
          this._api.post('CTHDBan/Create', cthdb).subscribe((r) => {
            if (r.success) {
            }
          });
          this._api.delete('CTGHang/Delete?id=' + e.id).subscribe((r) => {
            if (r.success) {
            }
          });
        });
        this._api.delete('GioHang/Delete?id=' + this.cart.id).subscribe((r) => {
          if (r.success) {
          }
        });
        sessionStorage.removeItem('cartPayment');
        if (value.tinhTrangDH == '12' || value.tinhTrangDH == 12) {
          this.qr = 'https://localhost:7064/api/HDBan/CreatePayment?amout=' + value.tongTien + '&info=' + code;
          $('#paymentmModal').modal('toggle');
        }
        else{
          alert("Bạn đã đặt hàng thành công!")
          this.router.navigate(['/']);
        }
      }
    });

    //this.router.navigate(['/']);
  }
  closePayment() {
    $(`#paymentmModal`).modal('hide');
    this.router.navigate(['/']);
  }
}
