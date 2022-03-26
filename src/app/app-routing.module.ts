import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ManageUsersComponent} from "../manage-users/manage-users.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "manage-users",
    component: ManageUsersComponent,
    canActivate: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
