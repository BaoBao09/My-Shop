import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  public user: any;
  public cart: any;
  public discountForm: any;
  public discountPercent: any;
  public total: number = 0;
  public totalPayment: number = 0;
  constructor(private _api: ApiService, private router: Router) {}
  ngOnInit(): void {
    var local = localStorage.getItem('user');
    if (local != null) {
      this.user = JSON.parse(local);
      this.loadData()
      this.discountForm = new FormGroup({
        discountID: new FormControl(),
      });
    }
  }
  loadData() {
    this._api.get('GioHang/GetByIdKH/' + this.user.id).subscribe((res) => {
      if (res.success) {
        this.cart = res.data;
        this.sumCart()
      }
    });
  }
  loadImage(url) {
    return 'https://localhost:7064/api/File/ReadFile?path=' + url;
  }
  changeQuantity(item, quatity){
    item.soLuong = quatity
    this._api.put('GioHang/GetByIdKH', item).subscribe((res) => {
      if (res.success) {
        this.loadData()
      }
    });
  }
  deleteItem(item) {
    this._api.delete('GioHang/GetByIdKH/' + item.id).subscribe((res) => {
      if (res.success) {
        this.loadData()
      }
    });
  }
  discount(discount) {
    console.log(discount.discountID);
    this._api
      .get('KhuyenMai/CheckDiscount?discountID=' + discount.discountID)
      .subscribe((res) => {
        this.discountPercent = res.data;
      });
  }
  sumCart() {
    let total = 0;
    this.cart.cTGHangs.forEach((e) => {
      total += e.gia * e.soLuong;
    });
    return total;
  }
  sumPayment() {
    if (this.discountPercent > 0) {
      this.totalPayment = this.total * (1 - this.discountPercent);
      return this.totalPayment
    }
    this.totalPayment = this.total;
    return this.totalPayment
  }
  handleCheckout(){
    this.cart.total = this.total;
    this.cart.totalPayment = this.totalPayment;
    sessionStorage.setItem("cartPayment", JSON.stringify(this.cart))
    this.router.navigate(['/check-out']);
  }
}
