import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authority } from './enums/permissions';

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

	canProfile(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.PROFILE) != null) return true;
		}
		return false;
	}

	canEvidence(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.RECORDS) != null) return true;
		}
		return false;
	}

	canAcquisitions(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.ACQUISITIONS) != null)
				return true;
		}
		return false;
	}

	canSales(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.SALES) != null) return true;
		}
		return false;
	}

	canReports(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.REPORTS) != null) return true;
		}
		return false;
	}

	canBookkeeping(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.BOOKKEEPING) != null)
				return true;
		}
		return false;
	}

	canAccountPlan(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.ACCOUNT_PLAN) != null)
				return true;
		}
		return false;
	}

	canBookkeepingJournal(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.BOOKKEEPING_JOURNAL) != null)
				return true;
		}
		return false;
	}

	canMainBook(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.MAIN_BOOK) != null)
				return true;
		}
		return false;
	}

	canKUF(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.KUF) != null) return true;
		}
		return false;
	}

	canKIF(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.KIF) != null) return true;
		}
		return false;
	}

	canAddNewInvoice(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.ADD_INVOICE) != null)
				return true;
		}
		return false;
	}

	canAddNewClient(): boolean {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.ADD_CLIENT) != null)
				return true;
		}
		return false;
	}

	canObracunZarade() {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.PAYROLL) != null) return true;
		}
		return false;
	}

	canBilansStanja() {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.BILANS_STANJA) != null)
				return true;
		}
		return false;
	}

	canBilansUspeha() {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.BILANS_USPEHA) != null)
				return true;
		}
		return false;
	}

	canBrutoBilans() {
		if (this.loggedIn()) {
			if (sessionStorage.getItem(Authority.BRUTO_BILANS) != null)
				return true;
		}
		return false;
	}
}
