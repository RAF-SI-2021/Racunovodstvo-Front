import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';


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
import { AnalitickeKarticeComponent } from './components/analiticke-kartice/analiticke-kartice.component';
import {MatButtonModule} from "@angular/material/button";
import { BilansStanjaUspehaComponent } from './components/bilans-stanja-uspeha/bilans-stanja-uspeha.component';
import {BsuPopupComponent} from "./components/bilans-stanja-uspeha/bsu-popup/bsu-popup.component";
import {BlagajnaComponent} from "./components/blagajna/blagajna.component";

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
  BilansStanjaUspehaComponent,
  BsuPopupComponent,
    BlagajnaComponent
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
        MatButtonModule,
        MatDialogModule,
    ],
	providers: [DatePipe],
	bootstrap: [AppComponent],
})
export class AppModule {}
