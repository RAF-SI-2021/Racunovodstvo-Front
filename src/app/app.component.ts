import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/login/user.service';
import { Permission } from './shared/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  permissions: Permission[] = [];
  title = 'racunovodstvo';
  loggedIn = false;

  constructor(private router: Router, private userService: UserService) {
    this.getPermissions();
  }

  isAdmin(): boolean {
    //TODO is this correct for admin?
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'admin') return true;
    }

    return false;
  }

  getPermissions(): void {
    if (this.permissions.length == 0 && localStorage.getItem('jwt') != null) {
      this.userService.getLoggedInUser().subscribe((user) => {
        console.log(user);
        this.permissions = user.authorities;
        this.loggedIn = true;
      });
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    this.permissions = [];
    this.router.navigate(['login']);
    this.loggedIn = false;
  }

  canProfile(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'profil') return true;
    }

    return false;
  }

  canEvidence(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'evidencija') return true;
    }

    return false;
  }

  canAcquisitions(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'nabavke') return true;
    }

    return false;
  }

  canSales(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'prodaja') return true;
    }

    return false;
  }

  canReports(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'izvestaji') return true;
    }

    return false;
  }

  canBookkeeping(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'knjizenje') return true;
    }

    return false;
  }

  canAccountPlan(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'kontni plan') return true;
    }

    return false;
  }

  canBookkeepingJournal(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'dnevnik knjizenja')
        return true;
    }

    return false;
  }

  canMainBook(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'glavna knjiga')
        return true;
    }

    return false;
  }

  canKUF(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'kuf') return true;
    }

    return false;
  }

  canKIF(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'kif') return true;
    }

    return false;
  }

  canAddNewInvoice(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'dodaj fakturu')
        return true;
    }

    return false;
  }

  canAddNewClient(): boolean {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'dodaj komitenta')
        return true;
    }

    return false;
  }

  canObracunZarade() {
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].name.toLowerCase() == 'obracun zarade')
        return true;
    }

    return false;
  }
}
