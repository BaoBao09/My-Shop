import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminModule,
    UserModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
