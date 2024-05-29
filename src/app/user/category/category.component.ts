import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  public page: number = 1;
  public pageSize: number = 9;
  public totalItems: number = 18;
  public currentPage = 1;
  public formsearch: any;
  constructor(private _api: ApiService) {}
  public categories : any;
  public labels: any;
  public products : any;
  ngOnInit(): void {
    this._api.get('LoaiSP/GetAll').subscribe((res) => {
      this.categories = res.data;
    });
    this._api.get('SanPham/GetLabel').subscribe((res) => {
      this.labels = res.data;
    });

    this.formsearch = new FormGroup({
      idloaiSP : new FormControl(0),
      page : new FormControl(this.page),
      pageSize : new FormControl(this.pageSize),
      tenSP : new FormControl(""),
      thuongHieu : new FormControl(""),
    })
    this.search();
  }
  seachLoaiSP(id){
    this.formsearch.value.idloaiSP = id
    this.search()
  }
  seachthuongHieu(th){
    this.formsearch.value.thuongHieu = th
    this.search()
  }
  search() {
    console.log(this.formsearch.value);

    this._api.post('SanPham/Search', this.formsearch.value).subscribe((res) => {
      this.products = res.data.data;
      this.currentPage = res.data.page;
      this.pageSize = res.data.pageSize;
      this.totalItems = res.data.totalItem;
    });
  }
  loadPage(page: number) {
    this.pageSize = 9;
    var dataSearch = {
      page: page,
      pageSize: this.pageSize,
    };
    // this.formsearch.value.idloaiSP = value;
    this.formsearch.value.page = page;
    this._api.post('SanPham/Search', this.formsearch.value).subscribe((res) => {
      this.products = res.data.data;
      this.currentPage = res.data.page;
      this.pageSize = res.data.pageSize;
      this.totalItems = res.data.totalItem;
    });
  }
  loadImage(url) {
    return 'https://localhost:7064/api/File/ReadFile?path=' + url;
  }
}
