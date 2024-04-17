import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './users/header/header.component';
import { FooterComponent } from './users/footer/footer.component';
import { HomeComponent } from './users/home/home.component';
import { CategoriesComponent } from './users/categories/categories.component';
import { ProductDetailsComponent } from './users/product-details/product-details.component';
import { ShoppingCartComponent } from './users/shopping-cart/shopping-cart.component';
import { BlogComponent } from './users/blog/blog.component';
import { CheckOutComponent } from './users/check-out/check-out.component';
import { ContactComponent } from './users/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CategoriesComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    BlogComponent,
    CheckOutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
