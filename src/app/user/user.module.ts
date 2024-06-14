import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { SliderComponent } from './slider/slider.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogComponent } from './blog/blog.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    UserComponent,
    CategoryComponent,
    LayoutComponent,
    CartComponent,
    CheckOutComponent,
    LoginComponent,
    ProductComponent,
    SliderComponent,
    HomeComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgbModule,

  ]
})
export class UserModule { }
