import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AccountPlanComponent } from './components/account-plan/account-plan.component';
import { AddNewClientComponent } from './components/add-new-client/add-new-client.component';
import { AddNewInvoiceComponent } from './components/add-new-invoice/add-new-invoice.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { KufComponent } from './components/kuf/kuf.component';
import { KifComponent } from './components/kif/kif.component';
import { BookkeepingJournalComponent } from './components/bookkeeping-journal/bookkeeping-journal.component';
import { KnjizenjeWidgetComponent } from './components/knjizenje-widget/knjizenje-widget.component';

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
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		MatAutocompleteModule, // ?
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
