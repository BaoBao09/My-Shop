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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './staff/staff.component';
import { PromotionComponent } from './promotion/promotion.component';
import { BillComponent } from './bill/bill.component';
import { PostsComponent } from './posts/posts.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AdminComponent,
    LayoutComponent,
    HomeComponent,
    ProductComponent,
    LoginComponent,
    CategoryComponent,
    CustomerComponent,
    StaffComponent,
    PromotionComponent,
    BillComponent,
    PostsComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AdminRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
