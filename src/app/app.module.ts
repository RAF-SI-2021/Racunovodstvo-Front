import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProfileTestComponent} from './components/profile-test/profile-test.component';
import {AccountPlanComponent} from './components/account-plan/account-plan.component';
import {AddNewClientComponent} from './components/add-new-client/add-new-client.component';
import {AddNewInvoiceComponent} from './components/add-new-invoice/add-new-invoice.component';
import {ManageUsersComponent} from './components/manage-users/manage-users.component';
import {KufComponent} from './components/kuf/kuf.component';
import {KifComponent} from './components/kif/kif.component';
import {ZaposleniComponent} from './components/zaposleni/zaposleni.component';
import {PlateZaposlenihComponent} from './components/plate-zaposlenih/plate-zaposlenih.component';
import {KoeficijentiComponent} from './components/koeficijenti/koeficijenti.component';
import {BookkeepingJournalComponent} from './components/bookkeeping-journal/bookkeeping-journal.component';
import { ProfilZaposlenogComponent } from './components/profil-zaposlenog/profil-zaposlenog.component';
import {DatePipe} from "@angular/common";
import { SvaKnjizenjaComponent } from './components/sva-knjizenja/sva-knjizenja.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileTestComponent,
    AccountPlanComponent,
    AddNewClientComponent,
    AddNewInvoiceComponent,
    ManageUsersComponent,
    KufComponent,
    KifComponent,
    ZaposleniComponent,
    PlateZaposlenihComponent,
    KoeficijentiComponent,
    BookkeepingJournalComponent,
    ProfilZaposlenogComponent,
    SvaKnjizenjaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
