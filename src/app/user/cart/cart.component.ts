import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterStateSnapshot } from '@angular/router';
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
  public discountPercent = 0;
  public total: number = 0;
  public totalPayment: number = 0;
  constructor(private _api: ApiService, private router: Router) {}
  ngOnInit(): void {
    var local = localStorage.getItem('user');
    if (local != null) {
      this.user = JSON.parse(local);
      this.loadData();
      this.discountForm = new FormGroup({
        discountID: new FormControl(),
      });
    } else {
      this.router.navigate(['/login', { queryParams: 'cart' }]);
    }
  }
  loadData() {
    this._api.get('GioHang/GetByIdKH/' + this.user.id).subscribe((res) => {
      if (res.success) {
        this.cart = res.data;
        console.log(this.cart);
        this.sumCart();
      }
    });
  }
  loadImage(url) {
    return 'https://localhost:7064/api/File/ReadFile?path=' + url;
  }
  changeQuantity(item, event) {
    const inputElement = event.target as HTMLInputElement;
    const quatity = inputElement.value;
    item.soLuong = quatity;
    this._api.put('CTGHang/Update/' + item.id, item).subscribe((res) => {
      if (res.success) {
        this.loadData();
      }
    });
  }
  deleteItem(item) {
    console.log(item);
    this._api.delete('CTGHang/Delete?id=' + item.id).subscribe((res) => {
      if (res.success) {
        this.loadData();
      }
    });
  }
  discount(discount) {
    console.log(discount.discountID);
    this._api
      .get('KhuyenMai/CheckDiscount?discountID=' + discount.discountID)
      .subscribe((res) => {
        this.discountPercent = res.data.tiLeKM;
      });
  }
  sumCart() {
    let total = 0;
    this.cart.cTGHangs.forEach((e) => {
      total += e.gia * e.soLuong;
    });
    this.total = total;
    return total;
  }
  sumPayment() {
    if (this.discountPercent > 0) {
      this.totalPayment = this.total * (1 - this.discountPercent);
      return this.totalPayment;
    }
    this.totalPayment = this.total;
    return this.totalPayment;
  }
  handleCheckout() {
    this.cart.total = this.total;
    this.cart.totalPayment = this.totalPayment;
    sessionStorage.setItem('cartPayment', JSON.stringify(this.cart));
    this.router.navigate(['/check-out']);
  }
}
