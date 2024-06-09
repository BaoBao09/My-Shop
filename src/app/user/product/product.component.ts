import { Component, Renderer2 } from '@angular/core';
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
    private router: Router,
    private renderer: Renderer2
  ) {}
  public relateds: any;
  public id: any;
  public products: any;
  public sizes = new Array;
  public colors = new Array;
  public selectedColor = "";
  public selectedSize = "";
  public quantity = 0;
  public cTSPSelected : any;
  ngOnInit(): void {
    this.search();
  }
  search() {
    this.id = this.state.snapshot.params['id'];
    this._api.get('SanPham/GetByID/' + this.id).subscribe((res) => {
      this.products = res.data;
      this.getSizeAndColor(res.data.ctsPhams)
    });
    this._api.get('SanPham/GetRelated/' + this.id).subscribe((res) => {
      this.relateds = res.data;
    });
  }
  getSizeAndColor(ctsPhams)
  {
    ctsPhams.forEach(e => {
      if(!this.sizes.includes(e.size)){
        this.sizes.push(e.size)
      }
      if(!this.colors.includes(e.mauSac)){
        this.colors.push(e.mauSac)
      }
    });
  }
  chechEmty(anh){
    if(anh!="") return true;
    return false
  }
  focusColor(item: string) {
    $('.color').removeClass('label-focused');
    // Thêm lớp 'label-focused' vào nhãn được chọn
    const selectedLabel = document.querySelector(`label[for="${item}"]`);
    if (selectedLabel) {
      this.renderer.addClass(selectedLabel, 'label-focused');
    }
    this.selectedColor = item
    this.checkQuantity()

  }
  focusSize(item: string) {
    $('.size').removeClass('label-focused');
    // Thêm lớp 'label-focused' vào nhãn được chọn
    const selectedLabel = document.querySelector(`label[for="${item}"]`);
    if (selectedLabel) {
      this.renderer.addClass(selectedLabel, 'label-focused');
    }
    this.selectedSize = item
    this.checkQuantity()
  }
  checkQuantity()
  {
    this.quantity = 0
    if(this.selectedColor != "" && this.selectedSize !="")
      this.products.ctsPhams.forEach(e => {
        if(e.mauSac == this.selectedColor && e.size == this.selectedSize){
          this.quantity = e.soLuong
          this.cTSPSelected = e
          return
        }
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
        var productAdd;
        this.cart.cTGHangs.forEach((e) => {
          if (e.idCTSP == this.cTSPSelected.id) {
            e.soLuong = e.soLuong + 1;
            check = true;
            productAdd = e;
          }
        });
        //Kiểm tra tồn tại chi tiết sản phẩm
        if (!check) {
          var cTGHang = {
            idGh: this.cart.id,
            idCTSP: this.cTSPSelected.id,
            soLuong: 1,
            size: this.cTSPSelected.size,
            mauSac: this.cTSPSelected.mauSac,
          };
          await this._api.post('CTGHang/Create', cTGHang).subscribe((res) => {
            if (res.success) alert('Thêm giỏ hàng thành công');
            else alert('Có lỗi xảy ra, vui lòng kiểm tra lại!');
          });
        }
        else{
          productAdd.mauSac = this.cTSPSelected.mauSac

          await this._api.put('CTGHang/Update/'+productAdd.id, productAdd).subscribe((res) => {

            if (res.success) alert('Thêm giỏ hàng thành công');
            else alert('Có lỗi xảy ra, vui lòng kiểm tra lại!');
          });
        }
      } else {
        const ngaySinhDate = new Date;
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
            idGh: newCart.data.id,
            idCTSP: this.cTSPSelected.id,
            soLuong: 1,
            size: this.cTSPSelected.size,
            mauSac: this.cTSPSelected.mauSac,
          };
          this._api.post('CTGHang/Create', cTGHang).subscribe((res) => {
            if (res.success) alert('Thêm giỏ hàng thành công');
            else alert('Có lỗi xảy ra, vui lòng kiểm tra lại!');
          });
        }
        else{
          alert("Có lỗi xảy ra, vui lòng thử lại hoặc liên hệ với chúng tôi")
        }
      }
    } else {
      alert('Vui lòng đăng nhập để mua hàng!');
      this.router.navigate(['/login', { queryParams: 'product-details/' + this.id }]);
    }
  }
  loadImage(url) {
    return 'https://localhost:7064/api/File/ReadFile?path=' + url;
  }
}
