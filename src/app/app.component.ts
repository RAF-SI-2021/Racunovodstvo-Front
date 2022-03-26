import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'racunovodstvo';

  constructor(private router: Router, private userService: UserService) {
    localStorage.setItem('jwt', 'oashfoais')
  }



  isAdmin(): boolean {
    //TODO is this correct for admin?
    this.userService.getPermissions().subscribe(permissions => {
      console.log(permissions)
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'admin')
          return true;
      }
      return false;
    })
    return false;
  }

  loggedIn(): boolean {
  return localStorage.getItem('jwt') != null
  }

  logout() {
    localStorage.removeItem('jwt')
    this.router.navigate(['login'])
  }

  canProfile(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'profil')
          return true;
      }
      return false;
    })
    return false;
  }

  canEvidence(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'evidencija')
          return true;
      }
      return false;
    })
    return false;
  }

  canAcquisitions(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'nabavke')
          return true;
      }
      return false;
    })
    return false;
  }

  canSales(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'prodaja')
          return true;
      }
      return false;
    })
    return false;
  }

  canReports(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'izvestaji')
          return true;
      }
      return false;
    })
    return false;
  }

  canBookkeeping(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'knjizenje')
          return true;
      }
      return false;
    })
    return false;
  }

  canAccountPlan(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'kontni plan')
          return true;
      }
      return false;
    })
    return false;
  }

  canBookkeepingJournal(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'dnevnik knjizenja')
          return true;
      }
      return false;
    })
    return false;
  }

  canMainBook(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'glavna knjiga')
          return true;
      }
      return false;
    })
    return false;
  }

  canKUF(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'kuf')
          return true;
      }
      return false;
    })
    return false;
  }

  canKIF(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'kif')
          return true;
      }
      return false;
    })
    return false;
  }

  canAddNewInvoice(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'dodaj fakturu')
          return true;
      }
      return false;
    })
    return false;
  }

  canAddNewClient(): boolean {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'dodaj komitenta')
          return true;
      }
      return false;
    })
    return false;
  }

  canObracunZarade() {
    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'obracun zarade')
          return true;
      }
      return false;
    })
    return false;
  }
}
