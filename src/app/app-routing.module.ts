import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewClientComponent } from './add-new-client/add-new-client.component';

const routes: Routes = [
  {
    path: 'add-new-client',
    component: AddNewClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
