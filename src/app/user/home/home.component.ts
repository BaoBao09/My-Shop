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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public page: number = 1;
  public pageSize: number = 4;
  public totalItems: number = 10;
  public currentPage = 1;
  public formsearch: any;
  constructor(private _api: ApiService) {}
  public categories : any;
  public blogs : any;
  public products : any;
  public productsnew : any
  ngOnInit(): void {
    this._api.get('SanPham/GetBestSeller').subscribe((res) => {
      this.products = res.data;
    });
    this._api.get('SanPham/GetNews').subscribe((res) => {
      this.productsnew = res.data
    });
    this._api.get('BaiViet/GetAll').subscribe((res) => {
      this.blogs = res.data
    });
    this.formsearch = new FormGroup({
      idloaiSP : new FormControl(0),
      page : new FormControl(this.page),
      pageSize : new FormControl(this.pageSize),
      tenSP : new FormControl(""),
      thuongHieu : new FormControl(""),
    })
    //this.search(0);
  }

  search(value) {
    this.page = 1;
    this.pageSize = 5;
    this.formsearch.value.idloaiSP = value;
    this._api.post('SanPham/Search', this.formsearch.value).subscribe((res) => {
      this.products = res.data.data;
      this.currentPage = res.data.page;
      this.pageSize = res.data.pageSize;
      this.totalItems = res.data.totalItem;
    });
  }
  loadPage(page: number) {
    this.pageSize = 5;
    var dataSearch = {
      page: page,
      pageSize: this.pageSize,
    };
  }
  loadImage(url) {
    return 'https://localhost:7064/api/File/ReadFile?path=' + url;
  }
}

