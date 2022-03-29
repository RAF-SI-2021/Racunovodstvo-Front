import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ProfileTestComponent} from "./components/profile-test/profile-test.component";
import {ProfileGuard} from "./guards/profile.guard";
import {AccountPlanComponent} from "./components/account-plan/account-plan.component";
import {AccountPlanGuard} from "./guards/account-plan.guard";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "profile",
    component: ProfileTestComponent,
    canActivate: [ProfileGuard]
  },
  {
    path: "account-plan",
    component: AccountPlanComponent,
    canActivate: [AccountPlanGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
