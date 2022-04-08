import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Authority } from '../enums/permissions';

@Injectable({
	providedIn: 'root',
})
export class AccountPlanGuard implements CanActivate {
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return sessionStorage.getItem(Authority.ACCOUNT_PLAN) != null;
	}
}
