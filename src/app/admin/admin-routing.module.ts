import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard, RoleGuard } from '../services/auth.guard';
import { LoginComponent } from './login/login.component';
import { Role } from '../model/role';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product', component: ProductComponent },
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [RoleGuard],
        data: { roles: [Role.Admin] },
      },
      { path: 'customer', component: CustomerComponent },
      { path: 'customer', component: CustomerComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
