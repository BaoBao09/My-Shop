import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public isLogin = true;
  public formLogin : any;
  public formSignUp : any;
  public user : any;
  constructor(private _api : ApiService, private state: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username : new FormControl(),
      password : new FormControl()
    });
    this.formSignUp = new FormGroup({
      tenDN : new FormControl(),
      email : new FormControl(),
      matKhau : new FormControl()
    })
  }
  checkLogin(obj){
    var form = {
      username : obj.username,
      password : obj.password
    }
    this._api.post("KhachHang/Login", form).subscribe((res) => {
      if (res.success) {
        localStorage.setItem("user", JSON.stringify(res.data))
        alert("Đăng nhập thành công!")
        var page = this.state.snapshot.params['queryParams'];
        this.router.navigate(['/'+page]);
      }
    });
  }
  checkSingUp(obj) {
    const form = {
      tenDN : obj.tenDN,
      email : obj.email,
      matKhau : obj.matKhau,
      trangThai : true,
    };
    this._api.post("KhachHang/Create", form).subscribe((res)=> {
      if (res.success) {
        localStorage.setItem("user", JSON.stringify(res.data))
        alert("Đăng ký thành công!");
        var page = this.state.snapshot.params['queryParams'];
        this.router.navigate(['/'+page]);
        this.isLogin = true;
      } else {
        alert("Đăng ký thất bại!");
      }
    });
  }


  checkFormSignUp()
  {
    this.isLogin = false
  }
  checkFormSignIn()
  {
    this.isLogin = true
  }
}
