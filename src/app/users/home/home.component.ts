import { ApiService } from './../../services/api.service';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KhachHang } from 'src/app/model/KhachHang';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private apiService: ApiService)
  {
    this.LoadData()
  }
  ngOnInit(): void {}
  data : object | undefined;
  public async LoadData(){
    let userInfo: KhachHang = {
      id: 0,
      hoTen: "123",
      ngaySinh: new Date(),
      soDT: "",
      email: "",
      gioiTinh: true,
      trangThai: true
    };
    await this.apiService.post("KhachHang/Create", userInfo).subscribe(
      (response) => {
            // if(!response.success)
            // {
            //   console.error('Error:');
            // }
            console.log('Data from API:', response);
          }
    );
  }
}
