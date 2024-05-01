import { Component, Injector, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  constructor(private _api: ApiService) {}
  public categories : any;
  public products : any;
  ngOnInit(): void {
    this.search();
  }
  search() {

    this._api.get('LoaiSP/GetAll').subscribe((res) => {
      this.categories = res.data;
    });
    this._api.get('SanPham/GetAll').subscribe((res) => {
      this.products = res.data;
    });
  }
}
