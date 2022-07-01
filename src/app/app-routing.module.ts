import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddNewClientComponent } from './components/add-new-client/add-new-client.component';
import { AddNewInvoiceComponent } from './components/add-new-invoice/add-new-invoice.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { KufComponent } from './components/kuf/kuf.component';
import { KifComponent } from './components/kif/kif.component';
import { BookkeepingJournalComponent } from './components/bookkeeping-journal/bookkeeping-journal.component';
import { ZaposleniComponent } from './components/zaposleni/zaposleni.component';
import { PlateZaposlenihComponent } from './components/plate-zaposlenih/plate-zaposlenih.component';
import { KoeficijentiComponent } from './components/koeficijenti/koeficijenti.component';
import { BrutoBilansComponent } from './components/bruto-bilans/bruto-bilans.component';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { FinansijskaOperativaGuard } from './guards/finansijska-operativa.guard';
import { FinansijskoKnjigovodstvoGuard } from './guards/finansijsko-knjigovodstvo.guard';
import { ObracunZaradeGuard } from './guards/obracun-zarade.guard';
import { KnjizenjeWidgetComponent } from './components/knjizenje-widget/knjizenje-widget.component';
import { AnalitickeKarticeComponent } from './components/analiticke-kartice/analiticke-kartice.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BlagajnaComponent } from './components/blagajna/blagajna.component';
import { KalkulacijeComponent } from './components/kalkulacije/kalkulacije.component';
import { KonverzijaComponent } from './components/konverzija/konverzija.component';

import { IzvestajiComponent } from './components/izvestaji/izvestaji.component';
import { IzvestajGuard } from './guards/izvestaj.guard';

import { MpFakturaComponent } from './components/mp-faktura/mp-faktura.component';
import { ProdajaGuard } from './guards/prodaja.guard';
import { PovracajComponent } from './components/povracaj/povracaj.component';
import { EvidencijeComponent } from './components/evidencije/evidencije.component';
import { ArtikalComponent } from './components/artikal/artikal.component';
import { ProfitniCentarComponent } from './components/profitni-centar/profitni-centar.component';

import { AccountPlanComponent } from './components/account-plan/account-plan.component';
import { ProfilZaposlenogComponent } from './components/profil-zaposlenog/profil-zaposlenog.component';
import { SvaKnjizenjaComponent } from './components/sva-knjizenja/sva-knjizenja.component';
import { TroskovniCentarComponent } from './components/troskovni-centar/troskovni-centar.component';

import { ProfileComponent } from './components/profile/profile.component';
import { ProfileGuard } from './guards/profile.guard';
import { NabavkeGuard } from './guards/nabavke.guard';
import { ObracunComponent } from './components/obracun/obracun.component';
import {Konverzija2Component} from "./components/konverzija2/konverzija2.component";

const routes: Routes = [
	{
		path: '',
		component: HomepageComponent,
	},
	// USER
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
	{
		path: 'profil',
		component: ProfileComponent,
		canActivate: [ProfileGuard],
	},
	// WIDGET
	{
		path: 'knjizenje-widget',
		component: KnjizenjeWidgetComponent,
		canActivate: [FinansijskoKnjigovodstvoGuard],
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
	{
		path: 'cash-register',
		component: BlagajnaComponent,
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
	{
		path: 'profitni-centar',
		component: ProfitniCentarComponent,
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
		path: 'obracun',
		component: ObracunComponent,
		canActivate: [ObracunZaradeGuard],
	},
	{
		path: 'koeficijenti',
		component: KoeficijentiComponent,
		canActivate: [ObracunZaradeGuard],
	},
	{
		path: 'analiticke-kartice',
		component: AnalitickeKarticeComponent,
		canActivate: [FinansijskoKnjigovodstvoGuard],
	},
	//NABAVKE
	{
		path: 'kalkulacije',
		component: KalkulacijeComponent,
		canActivate: [NabavkeGuard],
	},
	{
		path: 'konverzije',
		component: Konverzija2Component,
		canActivate: [NabavkeGuard],
	},
  // { ZA TEST ******
  //   path: 'knv',
  //   component: Konverzija2Component,
  //   canActivate: [NabavkeGuard],
  // },
	{
		path: 'izvestaji',
		component: IzvestajiComponent,
		canActivate: [IzvestajGuard],
	},
	//PRODAJA
	{
		path: 'mp_faktura',
		component: MpFakturaComponent,
		canActivate: [ProdajaGuard],
	},
	{
		path: 'povracaj',
		component: PovracajComponent,
		canActivate: [ProdajaGuard],
	},
	{
		path: 'evidencije',
		component: EvidencijeComponent,
	},
	{
		path: 'artikal/:id',
		component: ArtikalComponent,
	},
	// zasto ovo postoji
	// {
	// 	path: 'svaKnjizenja',
	// 	component: SvaKnjizenjaComponent,
	// 	// canActivate
	// },
	{
		path: 'troskovni-centar',
		component: TroskovniCentarComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
