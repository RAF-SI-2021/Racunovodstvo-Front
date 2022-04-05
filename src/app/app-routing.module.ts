import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ProfileTestComponent } from './components/profile-test/profile-test.component';
import { AddNewClientComponent } from './components/add-new-client/add-new-client.component';
import { AddNewInvoiceComponent } from './components/add-new-invoice/add-new-invoice.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

import { ProfileGuard } from './guards/profile.guard';
import { AddClientGuard } from './guards/add-client.guard';
import { AddInvoiceGuard } from './guards/add-invoice.guard';

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
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
