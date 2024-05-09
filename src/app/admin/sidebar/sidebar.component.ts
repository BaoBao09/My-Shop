import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  userSubject: any;
  constructor() {
    this.userSubject = JSON.parse(localStorage.getItem('staff')!);
  }
}
