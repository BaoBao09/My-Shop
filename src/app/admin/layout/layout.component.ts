import { Component } from '@angular/core';
@Component({
  selector: 'app-layout',
  template: `
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
  data-sidebar-position="fixed" data-header-position="fixed">
  <app-sidebar></app-sidebar>
  <div class="body-wrapper">
      <app-header></app-header>
      <div class="container-fluid">
      <router-outlet></router-outlet>
      </div>
  </div>
  <app-footer></app-footer>
</div>
  `,
  styles: []
})
export class LayoutComponent { }