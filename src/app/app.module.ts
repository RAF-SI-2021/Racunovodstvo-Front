import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddNewClientComponent } from './add-new-client/add-new-client.component';
import { AddNewInvoiceComponent } from './add-new-invoice/add-new-invoice.component';
import { ProfileTestComponent } from './components/profile-test/profile-test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileTestComponent,
    AddNewClientComponent,
    AddNewInvoiceComponent,
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
