import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTreeModule} from '@angular/material/tree';


// Mat
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { AccountPlanComponent } from './components/account-plan/account-plan.component';
import { AddNewClientComponent } from './components/add-new-client/add-new-client.component';
import { AddNewInvoiceComponent } from './components/add-new-invoice/add-new-invoice.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { KufComponent } from './components/kuf/kuf.component';
import { KifComponent } from './components/kif/kif.component';
import { BookkeepingJournalComponent } from './components/bookkeeping-journal/bookkeeping-journal.component';
import { KnjizenjeWidgetComponent } from './components/knjizenje-widget/knjizenje-widget.component';
import { ZaposleniComponent } from './components/zaposleni/zaposleni.component';
import { ProfilZaposlenogComponent } from './components/profil-zaposlenog/profil-zaposlenog.component';
import { PlateZaposlenihComponent } from './components/plate-zaposlenih/plate-zaposlenih.component';
import { KoeficijentiComponent } from './components/koeficijenti/koeficijenti.component';
import { SvaKnjizenjaComponent } from './components/sva-knjizenja/sva-knjizenja.component';
import { BrutoBilansComponent } from './components/bruto-bilans/bruto-bilans.component';
import { DatePipe } from '@angular/common';
import { MpFakturaComponent } from './components/mp-faktura/mp-faktura.component';
import { PovracajComponent } from './components/povracaj/povracaj.component';
import { AnalitickeKarticeComponent } from './components/analiticke-kartice/analiticke-kartice.component';
import {MatButtonModule} from "@angular/material/button";
import { BilansStanjaUspehaComponent } from './components/bilans-stanja-uspeha/bilans-stanja-uspeha.component';
import {BsuPopupComponent} from "./components/bilans-stanja-uspeha/bsu-popup/bsu-popup.component";
import {BlagajnaComponent} from "./components/blagajna/blagajna.component";
import { KalkulacijeComponent } from './components/kalkulacije/kalkulacije.component';
import { KonverzijaComponent } from './components/konverzija/konverzija.component';
import { EvidencijeComponent } from './components/evidencije/evidencije.component';
import { ArtikalComponent } from './components/artikal/artikal.component';

import {MatIcon, MatIconModule} from "@angular/material/icon";
import {ProfitniCentarComponent} from "./components/profitni-centar/profitni-centar.component";

import {ProfileTestComponent} from "./components/profile-test/profile-test.component";
import {TroskovniCentarComponent} from "./components/troskovni-centar/troskovni-centar.component";
import {MatDialogModule,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { HomepageComponent } from './components/homepage/homepage.component';
import { ProfileComponent } from './components/profile/profile.component';
import {MatCardModule} from "@angular/material/card";


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		AccountPlanComponent,
		AddNewClientComponent,
		AddNewInvoiceComponent,
		ManageUsersComponent,
		KufComponent,
		KifComponent,
		BookkeepingJournalComponent,
		KnjizenjeWidgetComponent,
		ZaposleniComponent,
		ProfilZaposlenogComponent,
		PlateZaposlenihComponent,
		KoeficijentiComponent,
		SvaKnjizenjaComponent,
		BrutoBilansComponent,
    AnalitickeKarticeComponent,
    HomepageComponent,
    AnalitickeKarticeComponent,
    BilansStanjaUspehaComponent,
    BsuPopupComponent,
    BlagajnaComponent,
    KalkulacijeComponent,
    KonverzijaComponent,
    MpFakturaComponent,
    PovracajComponent,
    EvidencijeComponent,
    ArtikalComponent,
    ProfitniCentarComponent,
    TroskovniCentarComponent,
    ProfileComponent
	],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      NgbModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule,
      // Mat
      MatAutocompleteModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatInputModule,
      MatTreeModule,
      MatIconModule,
      MatButtonModule,
      MatDialogModule,
      MatCardModule
	],
	providers: [DatePipe],
	bootstrap: [AppComponent],
})
export class AppModule {}
