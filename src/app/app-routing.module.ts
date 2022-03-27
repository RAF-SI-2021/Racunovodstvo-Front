import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddNewInvoiceComponent} from "./add-new-invoice/add-new-invoice.component";

const routes: Routes = [
  {
    path: "add-new-invoice",
    component:AddNewInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
