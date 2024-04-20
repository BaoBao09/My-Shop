import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductComponent } from './product/product.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AdminComponent,
    LayoutComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
