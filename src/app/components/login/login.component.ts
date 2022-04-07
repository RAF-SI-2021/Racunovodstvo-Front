import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../services/login/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	wrongPasswordOrUsername: boolean = false;

	constructor(
		private userService: UserService,
		private loginService: LoginService,
		private formBuilder: FormBuilder,
		private router: Router
	) {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		if (this.loggedIn()) {
			this.router.navigate(['profile']);
		}
		this.wrongPasswordOrUsername = false;
	}

	login() {
		this.loginService
			.login(
				this.loginForm.get('email')?.value,
				this.loginForm.get('password')?.value
			)
			.subscribe({
				next: (resp) => {
					let jwt = resp.jwt;

					console.log('logging in');
					sessionStorage.setItem('jwt', jwt);
					this.loginForm.reset();
					this.wrongPasswordOrUsername = false;
					this.router.navigate(['profile']).then(value => {
            window.location.reload();
          });
				},
				error: () => {
					this.wrongPasswordOrUsername = true;
				},
			});
	}

	loggedIn() {
		return sessionStorage.getItem('jwt') != null;
	}
}
