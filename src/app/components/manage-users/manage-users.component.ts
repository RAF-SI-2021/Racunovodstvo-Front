import { Component, OnInit } from '@angular/core';
import { Permission, User } from '../../shared/manage-users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageUsersService } from '../../services/manage-users/manage-users.service';
import { Authority } from 'src/app/shared/enums/permissions';

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
  permissions: Permission[] = [];
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
      finknj: [false],
      obrza: [false],
      finop: [false],
    });
    this.userAddForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      finknj: [false],
      obrza: [false],
      finop: [false],
    });
  }

  ngOnInit(): void {
    this.serviceBack.listAllPermissions().subscribe( res =>{
      this.permissions = res;
    });
    this.serviceBack.listAllUsers().subscribe(
      (res) => {
        this.users = res;
        console.log(res)
      },
      (error) => {
        alert("Došlo je do greške")
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
        alert('Došlo je do greške.')
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
    this.userEditForm.controls['finknj'].setValue(this.findPermissions(this.userToEdit, "finknj"));
    this.userEditForm.controls['obrza'].setValue(this.findPermissions(this.userToEdit, "obrza"));
    this.userEditForm.controls['finop'].setValue(this.findPermissions(this.userToEdit, "finop"));
    this.hiddenEdit = !this.hiddenEdit;
  }

  findPermissions(user: User, permission: string){
    for (let i = 0; i < user.permissions.length; i++) {
      if(user.permissions[i].name === permission )
        return true;
    }
    return false;
  }
  addToggle() {
    this.hiddenEdit = true;
    this.addOrEdit = 'Dodavanje';
    this.userAddForm.controls['username'].setValue('');
    this.userAddForm.controls['name'].setValue('');
    this.userAddForm.controls['surname'].setValue('');
    this.userAddForm.controls['password'].setValue('');
    this.userAddForm.controls['finknj'].setValue(false);
    this.userAddForm.controls['obrza'].setValue(false);
    this.userAddForm.controls['finop'].setValue(false);
    this.hiddenAdd = !this.hiddenAdd;
  }

  edit() {
    let usrname = this.userEditForm.get('username')?.value;
    let firstName = this.userEditForm.get('name')?.value;
    let lastName = this.userEditForm.get('surname')?.value;
    if (this.userToEdit !== undefined) {
      let permissions: Permission[] = this.populatePermissionsEdit();
      if (usrname != '' && firstName != '' && lastName != '') {
        this.serviceBack
          .updateUser(
            usrname,
            firstName,
            lastName,
            this.userToEdit.userId,
            permissions
          )
          .subscribe(
            (res) => {
              this.ngOnInit();
              this.hiddenEdit = !this.hiddenEdit;
            },
            (error) => {
              alert('Došlo je do greške.');
            }
          );
      } else {
        alert('Sva polja su obavezna');
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
      let permissions: Permission[] = this.populatePermissionsAdd();
      //console.log(permissions);
      for (let i = 0; i < this.users.length; i++) {
        if(this.users[i].username === usrname){
          alert('Korisnik već postoji.');
          return;
        }
      }
      this.serviceBack
        .addUser(usrname, firstName, lastName, password, permissions)
        .subscribe(() => {
          this.hiddenAdd = !this.hiddenAdd;
          this.ngOnInit();
        });
    } else {
      alert('Sva polja su obavezna');
    }
  }


  populatePermissionsEdit(): Permission[] {
    let toReturn: Permission[] = [];
    if (this.userEditForm.get(Authority.FINANSIJSKO_KNJIGOVODSTVO)?.value) {
      for (let i = 0; i < this.permissions.length; i++) {
        if(this.permissions[i].name === Authority.FINANSIJSKO_KNJIGOVODSTVO){
          toReturn.push(this.permissions[i]);
        }
      }
    }
    if (this.userEditForm.get(Authority.OBRACUN_ZARADE)?.value) {
      for (let i = 0; i < this.permissions.length; i++) {
        if(this.permissions[i].name === Authority.OBRACUN_ZARADE){
          toReturn.push(this.permissions[i]);
        }
      }
    }
    if (this.userEditForm.get(Authority.FINANSIJSKA_OPERATIVA)?.value) {
      for (let i = 0; i < this.permissions.length; i++) {
        if(this.permissions[i].name === Authority.FINANSIJSKA_OPERATIVA){
          toReturn.push(this.permissions[i]);
        }
      }
    }
    return toReturn;
  }

  populatePermissionsAdd(): Permission[] {
    let toReturn: Permission[] = [];
    if (this.userAddForm.get(Authority.FINANSIJSKO_KNJIGOVODSTVO)?.value) {
      for (let i = 0; i < this.permissions.length; i++) {
        if(this.permissions[i].name === Authority.FINANSIJSKO_KNJIGOVODSTVO){
          toReturn.push(this.permissions[i]);
        }
      }
    }
    if (this.userAddForm.get(Authority.OBRACUN_ZARADE)?.value) {
      for (let i = 0; i < this.permissions.length; i++) {
        if(this.permissions[i].name === Authority.OBRACUN_ZARADE){
          toReturn.push(this.permissions[i]);
        }
      }
    }
    if (this.userAddForm.get(Authority.FINANSIJSKA_OPERATIVA)?.value) {
      for (let i = 0; i < this.permissions.length; i++) {
        if(this.permissions[i].name === Authority.FINANSIJSKA_OPERATIVA){
          toReturn.push(this.permissions[i]);
        }
      }
    }
    return toReturn;
  }

}
