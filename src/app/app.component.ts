import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authority } from './shared/enums/permissions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'racunovodstvo';

	constructor(private router: Router) {}

	isAdmin(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.ADMIN) != null) return true;
		}
		return false;
	}

	loggedIn(): boolean {
		return sessionStorage.getItem('jwt') != null;
	}

	logout() {
		sessionStorage.clear();
		this.router.navigate(['login']);
	}

	canFinOp(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.FINANSIJSKA_OPERATIVA) != null)
				return true;
		}
		return false;
	}

	canFinKnj(): boolean {
		if (this.loggedIn()) {
			if (
				sessionStorage.getItem(Authority.FINANSIJSKO_KNJIGOVODSTVO) !=
				null
			)
				return true;
		}
		return false;
	}

	canObrZa(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.OBRACUN_ZARADE) != null)
				return true;
		}
		return false;
	}
}
