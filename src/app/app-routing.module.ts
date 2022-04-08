import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileTestComponent } from './components/profile-test/profile-test.component';
import { AddNewClientComponent } from './components/add-new-client/add-new-client.component';
import { AddNewInvoiceComponent } from './components/add-new-invoice/add-new-invoice.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { KufComponent } from './components/kuf/kuf.component';
import { KifComponent } from './components/kif/kif.component';
import {AccountPlanComponent} from "./components/account-plan/account-plan.component";
import {AccountPlanGuard} from "./guards/account-plan.guard";

import { ProfileGuard } from './guards/profile.guard';
import { AddClientGuard } from './guards/add-client.guard';
import { AddInvoiceGuard } from './guards/add-invoice.guard';
import { KUFGuard } from './guards/kuf.guard';
import { KIFGuard } from './guards/kif.guard';
import {KnjizenjaComponent} from "./knjizenja/knjizenja.component";

const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'profile',
		component: ProfileTestComponent,
		canActivate: [ProfileGuard],
	},
	{
		path: 'add-new-client',
		component: AddNewClientComponent,
		canActivate: [AddClientGuard],
	},
	{
		path: 'add-new-invoice',
		component: AddNewInvoiceComponent,
		canActivate: [AddInvoiceGuard],
	},
	{
		path: 'manage-users',
		component: ManageUsersComponent,
		canActivate: [],
	},
	{
		path: 'KUF',
		component: KufComponent,
		canActivate: [KUFGuard],
	},
	{
		path: 'KIF',
		component: KifComponent,
		canActivate: [KIFGuard],
	},
  {
    path: 'account-plan',
    component: AccountPlanComponent,
    canActivate: [AccountPlanGuard]
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
