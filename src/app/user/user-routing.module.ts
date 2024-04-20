import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { BlogComponent } from './blog/blog.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ContactComponent } from './contact/contact.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'product-details', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'check-out', component: CheckOutComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
