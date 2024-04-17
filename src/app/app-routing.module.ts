import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './users/blog/blog.component';
import { CategoriesComponent } from './users/categories/categories.component';
import { CheckOutComponent } from './users/check-out/check-out.component';
import { ContactComponent } from './users/contact/contact.component';
import { HomeComponent } from './users/home/home.component';
import { ProductDetailsComponent } from './users/product-details/product-details.component';
import { ShoppingCartComponent } from './users/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'product-details', component: ProductDetailsComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'check-out', component: CheckOutComponent},
  {path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
