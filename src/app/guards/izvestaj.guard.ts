import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Authority} from "../shared/enums/permissions";

@Injectable({
  providedIn: 'root'
})
export class IzvestajGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // TODO za sada vraca uvek true jer na beku nema te permisije
    //return sessionStorage.getItem(Authority.IZVESTAJ) != null;
    return true;
  }
}
