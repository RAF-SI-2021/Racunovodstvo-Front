import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {Permission} from "../model";
import {Authority} from "./enums/permissions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  permissions: Permission[] = []
  title = 'racunovodstvo';

  constructor(private router: Router, private userService: UserService) {
    // sessionStorage.setItem('jwt', 'testjwt')
  }


  isAdmin(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.ADMIN) != null)
        return true
    }
    return false;
  }

  loggedIn(): boolean {
    if (this.permissions.length == 0 && sessionStorage.getItem('jwt') != null) {
      this.userService.getLoggedInUser().subscribe(user => {
        this.permissions = user.authorities
        for (let i = 0; i < user.authorities.length; i++) {
          sessionStorage.setItem(user.authorities[i].name, user.authorities[i].name)
        }
      })
    }
    return sessionStorage.getItem('jwt') != null
  }

  logout() {
    sessionStorage.clear()
    this.permissions = []
    this.router.navigate(['login'])
  }

  canProfile(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.PROFILE) != null)
        return true
    }
    return false;
  }

  canEvidence(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.RECORDS) != null)
        return true
    }
    return false;
  }

  canAcquisitions(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.ACQUISITIONS) != null)
        return true
    }
    return false;
  }

  canSales(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.SALES) != null)
        return true
    }
    return false;
  }

  canReports(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.REPORTS) != null)
        return true
    }
    return false;
  }

  canBookkeeping(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.BOOKKEEPING) != null)
        return true
    }
    return false;
  }

  canAccountPlan(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.ACCOUNT_PLAN) != null)
        return true
    }
    return false;
  }

  canBookkeepingJournal(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.BOOKKEEPING_JOURNAL) != null)
        return true
    }
    return false;
  }

  canMainBook(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.MAIN_BOOK) != null)
        return true
    }
    return false;
  }

  canKUF(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.KUF) != null)
        return true
    }
    return false;
  }

  canKIF(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.KIF) != null)
        return true
    }
    return false;
  }

  canAddNewInvoice(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.ADD_INVOICE) != null)
        return true
    }
    return false;
  }

  canAddNewClient(): boolean {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.ADD_CLIENT) != null)
        return true
    }
    return false;
  }

  canObracunZarade() {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.PAYROLL) != null)
        return true
    }
    return false;
  }

  canBilansStanja() {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.BILANS_STANJA) != null)
        return true
    }
    return false;
  }

  canBilansUspeha() {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.BILANS_USPEHA) != null)
        return true
    }
    return false;
  }

  canBrutoBilans() {
    if (this.loggedIn()) {
      if (sessionStorage.getItem(Authority.BRUTO_BILANS) != null)
        return true
    }
    return false;
  }
}
