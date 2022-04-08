import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageUsersComponent} from "../manage-users/manage-users.component";
import {KnjizenjaComponent} from "./knjizenja/knjizenja.component";

const routes: Routes = [
  {
    path: "manage-users",
    component: ManageUsersComponent,
    canActivate: []
  },
  {
    path: "knjizenja",
    component: KnjizenjaComponent,
    // canActivate: [ManageUsersGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
