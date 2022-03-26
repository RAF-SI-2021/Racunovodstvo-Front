import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {Permission} from "../model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  permissions: Permission[] = []
  title = 'racunovodstvo';

  constructor(private router: Router, private userService: UserService) {
    // localStorage.setItem('jwt', 'testjwt')
  }


  isAdmin(): boolean {
    //TODO is this correct for admin?
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'admin')
          return true;
      }
    }
    return false;
  }

  loggedIn(): boolean {
    if (this.permissions.length == 0 && localStorage.getItem('jwt') != null) {
      this.userService.getLoggedInUser().subscribe(user => {
        this.permissions = user.authorities
      })
    }
    return localStorage.getItem('jwt') != null
  }

  logout() {
    localStorage.removeItem('jwt')
    this.permissions = []
    this.router.navigate(['login'])
  }

  canProfile(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'profil')
          return true;
      }
    }
    return false;
  }

  canEvidence(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'evidencija')
          return true;
      }
    }
    return false;
  }

  canAcquisitions(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'nabavke')
          return true;
      }
    }
    return false;
  }

  canSales(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'prodaja')
          return true;
      }
    }
    return false;
  }

  canReports(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'izvestaji')
          return true;
      }
    }
    return false;
  }

  canBookkeeping(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'knjizenje')
          return true;
      }
    }
    return false;
  }

  canAccountPlan(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'kontni plan')
          return true;
      }
    }
    return false;
  }

  canBookkeepingJournal(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'dnevnik knjizenja')
          return true;
      }
    }
    return false;
  }

  canMainBook(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'glavna knjiga')
          return true;
      }
    }
    return false;
  }

  canKUF(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'kuf')
          return true;
      }
    }
    return false;
  }

  canKIF(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'kif')
          return true;
      }
    }
    return false;
  }

  canAddNewInvoice(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'dodaj fakturu')
          return true;
      }
    }
    return false;
  }

  canAddNewClient(): boolean {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'dodaj komitenta')
          return true;
      }
    }
    return false;
  }

  canObracunZarade() {
    if (this.loggedIn()) {
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].name.toLowerCase() == 'obracun zarade')
          return true;
      }
    }
    return false;
  }
}
