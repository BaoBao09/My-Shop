import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent {
  public khachHang : any;
  public cart : any;
  formdata: any;
  constructor(private _api: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.khachHang = JSON.parse(localStorage.getItem("user")!);
    this.cart = JSON.parse(sessionStorage.getItem("cartPayment")!);
    console.log(this.cart);
    if(this.khachHang){

    }
    else{
      this.router.navigate(['/']);
    }
    this.formdata = new FormGroup({
      tenKH: new FormControl('', Validators.required),
      moTa: new FormControl(''),
    });
  }
  loadData() {
    this._api.get('GioHang/GetByIdKH/' + this.khachHang.id).subscribe((res) => {
      if (res.success) {
        this.cart = res.data;
      }
    });
  }
  showName(name : any)
  {
    if(name.length >= 20)
      return name.slice(0,20)+"..."
    else
      return name
  }
  handleCheckout(){
    this.router.navigate(['/check-out']);
  }
}
