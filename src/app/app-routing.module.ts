import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileTestComponent } from './components/profile-test/profile-test.component';
import { AddNewClientComponent } from './components/add-new-client/add-new-client.component';
import { AddNewInvoiceComponent } from './components/add-new-invoice/add-new-invoice.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { KufComponent } from './components/kuf/kuf.component';
import { KifComponent } from './components/kif/kif.component';
import { AccountPlanComponent } from './components/account-plan/account-plan.component';
import { BookkeepingJournalComponent } from './components/bookkeeping-journal/bookkeeping-journal.component';

import { ProfileGuard } from './guards/profile.guard';
import { AddClientGuard } from './guards/add-client.guard';
import { AddInvoiceGuard } from './guards/add-invoice.guard';
import { ManageUsersGuard } from './guards/manage-users.guard';
import { KUFGuard } from './guards/kuf.guard';
import { KIFGuard } from './guards/kif.guard';
import {ZaposleniComponent} from "./components/zaposleni/zaposleni.component";
import {PlateZaposlenihComponent} from "./components/plate-zaposlenih/plate-zaposlenih.component";
import {KoeficijentiComponent} from "./components/koeficijenti/koeficijenti.component";
import { AccountPlanGuard } from './guards/account-plan.guard';
import { BookkeepingJournalGuard } from './guards/bookkeeping-journal.guard';
import {ObracunComponent} from "./components/obracun/obracun.component";

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
		canActivate: [ManageUsersGuard],
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
    path: 'zaposleni',
    component: ZaposleniComponent,
    // canActivate: [KIFGuard],
  },
  {
    path: 'plate',
    component: PlateZaposlenihComponent,
    // canActivate: [KIFGuard],
  },
  {
    path: 'koeficijenti',
    component: KoeficijentiComponent,
    // canActivate: [KIFGuard],
  },
	{
		path: 'account-plan',
		component: AccountPlanComponent,
		canActivate: [AccountPlanGuard],
	},
	{
		path: 'bookkeeping-journal',
		component: BookkeepingJournalComponent,
		canActivate: [BookkeepingJournalGuard],
	},
  {
    path: 'obracun',
    component: ObracunComponent
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
