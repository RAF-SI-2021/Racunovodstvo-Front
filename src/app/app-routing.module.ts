import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddNewClientComponent } from './components/add-new-client/add-new-client.component';
import { AddNewInvoiceComponent } from './components/add-new-invoice/add-new-invoice.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { KufComponent } from './components/kuf/kuf.component';
import { KifComponent } from './components/kif/kif.component';
import { AccountPlanComponent } from './components/account-plan/account-plan.component';
import { BookkeepingJournalComponent } from './components/bookkeeping-journal/bookkeeping-journal.component';
import { ZaposleniComponent } from './components/zaposleni/zaposleni.component';
import { ProfilZaposlenogComponent } from './components/profil-zaposlenog/profil-zaposlenog.component';
import { PlateZaposlenihComponent } from './components/plate-zaposlenih/plate-zaposlenih.component';
import { KoeficijentiComponent } from './components/koeficijenti/koeficijenti.component';
import { SvaKnjizenjaComponent } from './components/sva-knjizenja/sva-knjizenja.component';
import { BrutoBilansComponent } from './components/bruto-bilans/bruto-bilans.component';

import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { FinansijskaOperativaGuard } from './guards/finansijska-operativa.guard';
import { FinansijskoKnjigovodstvoGuard } from './guards/finansijsko-knjigovodstvo.guard';
import { ObracunZaradeGuard } from './guards/obracun-zarade.guard';
import {KnjizenjeWidgetComponent} from "./components/knjizenje-widget/knjizenje-widget.component";

const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
		canActivate: [LoginGuard],
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [LoginGuard],
	},
	{
		path: 'manage-users',
		component: ManageUsersComponent,
		canActivate: [AdminGuard],
	},
	// FINANSIJSKA_OPERATIVA
	{
		path: 'KUF',
		component: KufComponent,
		canActivate: [FinansijskaOperativaGuard],
	},
	{
		path: 'KIF',
		component: KifComponent,
		canActivate: [FinansijskaOperativaGuard],
	},
	{
		path: 'add-new-invoice',
		component: AddNewInvoiceComponent,
		canActivate: [FinansijskaOperativaGuard],
	},
	{
		path: 'add-new-client',
		component: AddNewClientComponent,
		canActivate: [FinansijskaOperativaGuard],
	},
	// FINANSIJSKO_KNJIGOVODSTVO
	{
		path: 'account-plan',
		component: AccountPlanComponent,
		canActivate: [FinansijskoKnjigovodstvoGuard],
	},
	{
		path: 'bookkeeping-journal',
		component: BookkeepingJournalComponent,
		canActivate: [FinansijskoKnjigovodstvoGuard],
	},
	{
		path: 'sva-knjizenja',
		component: SvaKnjizenjaComponent,
		canActivate: [FinansijskoKnjigovodstvoGuard],
	},
	{
		path: 'bruto-bilans',
		component: BrutoBilansComponent,
		canActivate: [FinansijskoKnjigovodstvoGuard],
	},
	// OBRACUN_ZARADE
	{
		path: 'zaposleni',
		component: ZaposleniComponent,
		canActivate: [ObracunZaradeGuard],
	},
	{
		path: 'zaposleni/:id',
		component: ProfilZaposlenogComponent,
		canActivate: [ObracunZaradeGuard],
	},
	{
		path: 'plate',
		component: PlateZaposlenihComponent,
		canActivate: [ObracunZaradeGuard],
	},
	{
		path: 'koeficijenti',
		component: KoeficijentiComponent,
		canActivate: [ObracunZaradeGuard],
	},
  {
    path: 'knjizenje-widget',
    component: KnjizenjeWidgetComponent,
    canActivate: [FinansijskoKnjigovodstvoGuard],
  },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
