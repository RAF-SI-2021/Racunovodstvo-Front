import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewClientComponent } from './add-new-client/add-new-client.component';
import {LoginComponent} from "./components/login/login.component";
import {ProfileTestComponent} from "./components/profile-test/profile-test.component";
import {ProfileGuard} from "./guards/profile.guard";
import {AddNewInvoiceComponent} from "./add-new-invoice/add-new-invoice.component";
import { AddInvoiceGuard } from './guards/add-invoice.guard';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "profile",
    component: ProfileTestComponent,
    canActivate: [ProfileGuard]
  },
    path: 'add-new-client',
    component: AddNewClientComponent,
    canActivate: [AddClientGuard]
  },
  {
    path: "add-new-invoice",
    component:AddNewInvoiceComponent,
    canActivate: [AddInvoiceGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
