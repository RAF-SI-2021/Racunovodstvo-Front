import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/manage-users';
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
    this.hiddenAdd = !this.hiddenAdd;
  }
  edit() {
    let usrname = this.userEditForm.get('username')?.value;
    let firstName = this.userEditForm.get('name')?.value;
    let lastName = this.userEditForm.get('surname')?.value;
    if (this.userToEdit !== undefined) {
      if (usrname != '' && firstName != '' && lastName != '') {
        this.serviceBack
          .updateUser(usrname, firstName, lastName, this.userToEdit.userId)
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
    if (usrname != '' && firstName != '' && lastName != '' && password != '') {
      this.serviceBack
        .addUser(usrname, firstName, lastName, password)
        .subscribe((res) => {
          this.hiddenAdd = !this.hiddenAdd;
          this.ngOnInit();
        });
    } else {
      //sva polja su obavezna
    }
  }
}
