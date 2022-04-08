import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddNewClientComponent } from './components/add-new-client/add-new-client.component';
import { AddNewInvoiceComponent } from './components/add-new-invoice/add-new-invoice.component';
import { ProfileTestComponent } from './components/profile-test/profile-test.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { KufComponent } from './components/kuf/kuf.component';
import { KifComponent } from './components/kif/kif.component';
import { ZaposleniComponent } from './components/zaposleni/zaposleni.component';
import { PlateZaposlenihComponent } from './components/plate-zaposlenih/plate-zaposlenih.component';
import { KoeficijentiComponent } from './components/koeficijenti/koeficijenti.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		ProfileTestComponent,
		AddNewClientComponent,
		AddNewInvoiceComponent,
		ManageUsersComponent,
		KufComponent,
		KifComponent,
  ZaposleniComponent,
  PlateZaposlenihComponent,
  KoeficijentiComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
