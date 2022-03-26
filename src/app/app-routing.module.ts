import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageUsersComponent} from "../manage-users/manage-users.component";

const routes: Routes = [
  {
    path: "manage-users",
    component: ManageUsersComponent,
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
