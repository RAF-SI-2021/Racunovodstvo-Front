import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.loggedIn()) {
      this.router.navigate(['login']);
    }
  }

  loggedIn() {
    return sessionStorage.getItem('jwt') != null;
  }

  gotoFinOp(){
    this.router.navigate(['KUF'])
  }

  gotoFinKnj(){
    this.router.navigate(['account-plan'])
  }

  gotoObrZar() {
    this.router.navigate(['zaposleni'])
  }

  gotoProfile() {
    this.router.navigate(['profile'])
  }

  gotoEvidencije() {
    this.router.navigate([''])
  }

  gotoNabavke() {
    this.router.navigate([''])
  }

  gotoIzvestaji() {
    this.router.navigate([''])
  }

  gotoProdaja() {
    this.router.navigate([''])
  }
}
