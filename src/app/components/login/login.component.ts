import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {HttpStatusCode} from "@angular/common/http";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  wrongPasswordOrUsername: boolean = false;

  constructor(private userService: UserService, private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    if (this.loggedIn()) {
      this.router.navigate(['profile'])
    }
    this.wrongPasswordOrUsername = false
  }


  login() {
    this.loginService.login(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value,
    ).subscribe(resp => {
      if (resp.status != HttpStatusCode.Ok) {
        this.wrongPasswordOrUsername  = true
        return
      }
      let jwt = resp.body?.jwt

      console.log('logging in')
      if (typeof jwt === "string") {
        localStorage.setItem('jwt', jwt)
      }
      this.loginForm.reset()
      this.router.navigate(['profile'])
    })
  }

  loggedIn() {
    return localStorage.getItem("jwt") != null
  }

}
