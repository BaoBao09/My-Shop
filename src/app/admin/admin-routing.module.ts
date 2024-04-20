import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product', component: ProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
