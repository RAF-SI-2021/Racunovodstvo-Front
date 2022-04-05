import { Component, OnInit } from '@angular/core';
import { Permission, User } from '../../shared/manage-users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageUsersService } from '../../services/manage-users/manage-users.service';
import { first } from 'rxjs';

@Component({
	selector: 'app-manage-users',
	templateUrl: './manage-users.component.html',
	styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
	userEditForm: FormGroup;
	userAddForm: FormGroup;

	userToEdit: User | undefined;
	users: User[] = [];
	hiddenEdit: boolean = true;
	hiddenAdd: boolean = true;

	addOrEdit: string = '';

	constructor(
		private formBuilder: FormBuilder,
		private serviceBack: ManageUsersService
	) {
		this.userEditForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			name: ['', [Validators.required, Validators.minLength(3)]],
			surname: ['', [Validators.required, Validators.minLength(3)]],
		});
		this.userAddForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			name: ['', [Validators.required, Validators.minLength(3)]],
			surname: ['', [Validators.required, Validators.minLength(3)]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			profile: [false],
			records: [false],
			acquisitions: [false],
			sales: [false],
			reports: [false],
			bookkeeping: [false],
			kuf: [false],
			kif: [false],
			add_invoice: [false],
			account_plan: [false],
			bookkeeping_journal: [false],
			main_book: [false],
			add_client: [false],
			pay_roll: [false],
		});
	}

	ngOnInit(): void {
		this.serviceBack.listAllUsers().subscribe(
			(res) => {
				this.users = res;
			},
			(error) => {
				//error fetching data
			}
		);
		/*
    let user1 = new User(1,"user1", "usr1", "usric1", "12345678");
    let user2 = new User(2,"user2", "usr2", "usric2", "12345678");
    let user3 = new User(3,"user3", "usr3", "usric3", "12345678");
    let user4 = new User(4,"user3", "usr3", "usric3", "12345678");
    let user5 = new User(5,"user3", "usr3", "usric3", "12345678");
    let user6 = new User(6,"user3", "usr3", "usric3", "12345678");

    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
    this.users.push(user4);
    this.users.push(user5);
    this.users.push(user6);


 */
	}

	delete(user: User) {
		this.serviceBack.deleteUser(user.userId).subscribe(
			(res) => {
				this.hiddenEdit = true;
				//uspesno brisanje
				this.ngOnInit();
			},
			(error) => {
				//error
			}
		);
	}

	toggleUser(user: User) {
		this.hiddenAdd = true;
		this.userToEdit = user;
		this.addOrEdit = 'Ažuriranje';
		this.userEditForm.controls['username'].setValue(user.username);
		this.userEditForm.controls['name'].setValue(user.firstName);
		this.userEditForm.controls['surname'].setValue(user.lastName);
		this.hiddenEdit = !this.hiddenEdit;
	}

	addToggle() {
		this.hiddenEdit = true;
		this.addOrEdit = 'Dodavanje';
		this.userAddForm.controls['username'].setValue('');
		this.userAddForm.controls['name'].setValue('');
		this.userAddForm.controls['surname'].setValue('');
		this.userAddForm.controls['password'].setValue('');
		this.userAddForm.controls['profile'].setValue(false);
		this.userAddForm.controls['records'].setValue(false);
		this.userAddForm.controls['acquisitions'].setValue(false);
		this.userAddForm.controls['sales'].setValue(false);
		this.userAddForm.controls['reports'].setValue(false);
		this.userAddForm.controls['bookkeeping'].setValue(false);
		this.userAddForm.controls['kuf'].setValue(false);
		this.userAddForm.controls['kif'].setValue(false);
		this.userAddForm.controls['add_invoice'].setValue(false);
		this.userAddForm.controls['account_plan'].setValue(false);
		this.userAddForm.controls['bookkeeping_journal'].setValue(false);
		this.userAddForm.controls['main_book'].setValue(false);
		this.userAddForm.controls['add_client'].setValue(false);
		this.userAddForm.controls['pay_roll'].setValue(false);
		this.hiddenAdd = !this.hiddenAdd;
	}

	edit() {
		let usrname = this.userEditForm.get('username')?.value;
		let firstName = this.userEditForm.get('name')?.value;
		let lastName = this.userEditForm.get('surname')?.value;
		if (this.userToEdit !== undefined) {
			if (usrname != '' && firstName != '' && lastName != '') {
				this.serviceBack
					.updateUser(
						usrname,
						firstName,
						lastName,
						this.userToEdit.userId
					)
					.subscribe(
						(res) => {
							this.ngOnInit();
							this.hiddenEdit = !this.hiddenEdit;
						},
						(error) => {
							//error
						}
					);
			} else {
				//Polja su obavezna
			}
		}
	}

	add() {
		let usrname = this.userAddForm.get('username')?.value;
		let firstName = this.userAddForm.get('name')?.value;
		let lastName = this.userAddForm.get('surname')?.value;
		let password = this.userAddForm.get('password')?.value;
		if (
			usrname != '' &&
			firstName != '' &&
			lastName != '' &&
			password != ''
		) {
			let permissions: Permission[] = this.populatePermissions();
			console.log(permissions);
			this.serviceBack
				.addUser(usrname, firstName, lastName, password, permissions)
				.subscribe(() => {
					this.hiddenAdd = !this.hiddenAdd;
					this.ngOnInit();
				});
		} else {
			//sva polja su obavezna
		}
	}

	populatePermissions(): Permission[] {
		let toReturn: Permission[] = [];
		if (this.userAddForm.get('profile')?.value)
			toReturn.push(new Permission('profile'));
		if (this.userAddForm.get('records')?.value)
			toReturn.push(new Permission('records'));
		if (this.userAddForm.get('acquisitions')?.value)
			toReturn.push(new Permission('acquisitions'));
		if (this.userAddForm.get('sales')?.value)
			toReturn.push(new Permission('sales'));
		if (this.userAddForm.get('reports')?.value)
			toReturn.push(new Permission('reports'));
		if (this.userAddForm.get('bookkeeping')?.value)
			toReturn.push(new Permission('bookkeeping'));
		if (this.userAddForm.get('kuf')?.value)
			toReturn.push(new Permission('kuf'));
		if (this.userAddForm.get('kif')?.value)
			toReturn.push(new Permission('kif'));
		if (this.userAddForm.get('add_invoice')?.value)
			toReturn.push(new Permission('add_invoice'));
		if (this.userAddForm.get('account_plan')?.value)
			toReturn.push(new Permission('account_plan'));
		if (this.userAddForm.get('bookkeeping_journal')?.value)
			toReturn.push(new Permission('bookkeeping_journal'));
		if (this.userAddForm.get('main_book')?.value)
			toReturn.push(new Permission('main_book'));
		if (this.userAddForm.get('add_client')?.value)
			toReturn.push(new Permission('add_client'));
		if (this.userAddForm.get('pay_roll')?.value)
			toReturn.push(new Permission('pay_roll'));
		return toReturn;
	}
}