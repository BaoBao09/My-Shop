import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  userSubject: any;
  constructor() {
    this.userSubject = JSON.parse(localStorage.getItem('staff')!);
    console.log(this.userSubject.data.role);
  }
}
