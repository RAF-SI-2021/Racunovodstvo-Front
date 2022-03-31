import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, first, map } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class EvidencijeGuard implements CanActivate {
  user!: User;

  constructor(private userService: UserService) {
    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.getLoggedInUser().pipe(
      first(),
      map((user) => {
        if (user) {
          for (let i = 0; i < user.authorities.length; i++) {
            if (user.authorities[i].name === 'evidencija') return true;
          }
          return false;
        } else return true;
      })
    );
  }
}
