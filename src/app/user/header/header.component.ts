import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router){}
  user : any;
  isLOgin = false;
  ngOnInit(): void {
    this.user = localStorage.getItem("user")
    console.log(this.user);

    if(this.user)
      this.isLOgin = true;
  }
  logOut(){
    localStorage.removeItem("user");
    this.router.navigate(["/"])
    this.isLOgin = false
  }
}
