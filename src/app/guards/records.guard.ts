import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";
import {User} from "../../model";
import {Authority} from "../enums/permissions";

@Injectable({
  providedIn: 'root'
})
export class RecordsGuard implements CanActivate {
  user!: User;


  constructor(private userService: UserService) {
    this.userService.getLoggedInUser().subscribe(user => {
      this.user = user
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    for (let i = 0; i < this.user.authorities.length; i++) {
      if (this.user.authorities[i].name === Authority.RECORDS)
        return true
    }
    return false
  }

}
