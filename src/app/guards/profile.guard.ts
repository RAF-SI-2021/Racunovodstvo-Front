import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { UserService } from '../services/login/user.service';
import { User } from '../shared/user.model';

@Injectable({
	providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
	user!: User;

	constructor(private userService: UserService) {}

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
						if (user.authorities[i].name === 'profil') return true;
					}
					return false;
				} else return true;
			})
		);
	}
}
