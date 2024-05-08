import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CurrencyPipe } from '@angular/common';
declare var $:any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  constructor(private _api: ApiService, private state: ActivatedRoute) {}
  public categories : any;
  public products : any;
  ngOnInit(): void {
    this.search();
  }
  search() {
    var id = this.state.snapshot.params['id']
    this._api.get('SanPham/GetByID/'+ id).subscribe((res) => {
      this.products = res.data;
      console.log(this.products.ctsPhams[0]);
    });
  }
  loadImage(url) {
    return 'https://localhost:7064/api/File/ReadFile?path=' + url;
  }
}
