import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  user: any;
  cart: any;
  constructor(
    private _api: ApiService,
    private state: ActivatedRoute,
    private router: Router
  ) {}
  public categories: any;
  public id: any;
  public products: any;
  ngOnInit(): void {
    this.search();
  }
  search() {
    this.id = this.state.snapshot.params['id'];
    this._api.get('SanPham/GetByID/' + this.id).subscribe((res) => {
      this.products = res.data;
      console.log(this.products);
    });
  }
  async addCart(product) {
    var local = localStorage.getItem('user');
    if (local != null) {
      this.user = JSON.parse(local);
      var res = await this._api
        .get('GioHang/GetByIdKH/' + this.user.id)
        .toPromise();
      if (res.success) {
        this.cart = res.data;
        var check = false;
        this.cart.cTGHangs.forEach((e) => {
          if (e.idCTSP == product.ctsPhams[0].id) {
            e.soLuong = e.soLuong + 1;
            check = true;
          }
        });
        if (!check) {
          var cTGHang = {
            idGh: this.cart.id,
            idCTSP: product.ctsPhams[0].id,
            soLuong: 1,
            size: product.ctsPhams[0].size,
            mauSac: product.ctsPhams[0].mauSac,
          };
          await this._api.post('CTGHang/Create', cTGHang).subscribe((res) => {
            console.log(res);

            if (res.success) alert('Thêm giỏ hàng thành công');
            else alert('Có lỗi xảy ra, vui lòng kiểm tra lại!');
          });
        }
        else{

        }
      } else {
        const ngaySinhDate = new Date('2024-05-10T00:00:00');
        ngaySinhDate.setDate(ngaySinhDate.getDate() + 1);
        const ngaySinhValue = ngaySinhDate.toISOString().split('T')[0];
        var gh = {
          idKH: this.user.id,
          ngayTao: ngaySinhValue,
          trangThai: true,
        };
        var isCreateCart = await this._api.post('GioHang/Create', gh).toPromise();
        if (isCreateCart.success) {
          var newCart = await this._api.get('GioHang/GetByIdKH/' + this.user.id).toPromise();
          var cTGHang = {
            idGh: newCart.id,
            idCTSP: product.ctsPhams[0].id,
            soLuong: 1,
            size: product.ctsPhams[0].size,
            mauSac: product.ctsPhams[0].mauSac,
          };
          this._api.post('CTGHang/Create', cTGHang).subscribe((res) => {
            if (res.success) alert('Thêm giỏ hàng thành công');
            else alert('Có lỗi xảy ra, vui lòng kiểm tra lại!');
          });
        }
      }
    } else {
      alert('Vui lòng đăng nhập để mua hàng!');
      this.router.navigate(['/login', { queryParams: 'product/' + this.id }]);
    }
  }
  loadImage(url) {
    return 'https://localhost:7064/api/File/ReadFile?path=' + url;
  }
}
