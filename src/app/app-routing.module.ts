import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KufComponent} from "./kuf/kuf.component";
import {KifComponent} from "./kif/kif.component";

const routes: Routes = [
  {path: 'KUF', component: KufComponent},
  {path: 'KIF', component: KifComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
