import { Component, OnInit } from '@angular/core';
import { Permission, User } from '../../shared/manage-users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageUsersService } from '../../services/manage-users/manage-users.service';
import { Authority } from 'src/app/shared/enums/permissions';
import {Company} from "../../shared/invoice.model";

import {UserService} from "../../services/login/user.service";


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  userEditForm: FormGroup;
  userAddForm: FormGroup;
  loggedUser: User;

  preduzeca: Company[] = [];
  userToEdit: User | undefined;
  users: User[] = [];
  permissions: Permission[] = [];
  hiddenEdit: boolean = true;
  hiddenAdd: boolean = true;

  addOrEdit: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private serviceBack: ManageUsersService,
    private userService: UserService
  ) {
    this.userEditForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      finknj: [false],
      obrza: [false],
      finop: [false],
      nabavke: [false],
      profil: [false],
      evidencije: [false],
      izvestaji: [false],
      prodaja: [false]
    });
    this.userAddForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      finknj: [false],
      obrza: [false],
      finop: [false],
      nabavke: [false],
      profil: [false],
      evidencije: [false],
      izvestaji: [false],
      prodaja: [false],
    });
  }

  ngOnInit(): void {
    this.serviceBack.listAllPermissions().subscribe( res =>{
      this.permissions = res;
    });
    this.serviceBack.svaPreduzeca().subscribe((preduzeca) => {
      this.preduzeca = preduzeca;
    });

    this.userService.getLoggedInUser().subscribe((user) => {
      this.loggedUser = user
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
    for (let i = 0; i < user.permissions.length; i++) {
      if(user.permissions[i].name === Authority.ADMIN){
        alert("Ne mosete da brisete admin-a");
        return;
      }
    }
    if(this.loggedUser.userId === user.userId){
      alert("Ne smete da brisete samog sebe");
      return;
    }
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

    this.userEditForm.controls['nabavke'].setValue(this.findPermissions(this.userToEdit, "nabavke"));
    this.userEditForm.controls['profil'].setValue(this.findPermissions(this.userToEdit, "profil"));
    this.userEditForm.controls['evidencije'].setValue(this.findPermissions(this.userToEdit, "evidencije"));
    this.userEditForm.controls['izvestaji'].setValue(this.findPermissions(this.userToEdit, "izvestaji"));
    this.userEditForm.controls['prodaja'].setValue(this.findPermissions(this.userToEdit, "prodaja"));
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

    this.userAddForm.controls['nabavke'].setValue(false);
    this.userAddForm.controls['profil'].setValue(false);
    this.userAddForm.controls['evidencije'].setValue(false);
    this.userAddForm.controls['izvestaji'].setValue(false);
    this.userAddForm.controls['prodaja'].setValue(false);
    this.hiddenAdd = !this.hiddenAdd;
  }

  edit(preduzeceIndex: HTMLSelectElement) {
    let usrname = this.userEditForm.get('username')?.value;
    let firstName = this.userEditForm.get('name')?.value;
    let lastName = this.userEditForm.get('surname')?.value;
    let preduzeceId = this.preduzeca[preduzeceIndex.selectedIndex].preduzeceId
    if (this.userToEdit !== undefined) {
      let permissions: Permission[] = this.populatePermissionsEdit();
      if (usrname != '' && firstName != '' && lastName != '') {
        this.serviceBack
          .updateUser(
            usrname,
            firstName,
            lastName,
            this.userToEdit.userId,
            permissions,
            preduzeceId
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

  add(preduzecaAdd: HTMLSelectElement) {
    let usrname = this.userAddForm.get('username')?.value;
    let firstName = this.userAddForm.get('name')?.value;
    let lastName = this.userAddForm.get('surname')?.value;
    let password = this.userAddForm.get('password')?.value;
    let preduzece = this.preduzeca[preduzecaAdd.selectedIndex].preduzeceId;
    if (
      usrname != '' &&
      firstName != '' &&
      lastName != '' &&
      password != '' &&
      preduzece
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
        .addUser(usrname, firstName, lastName, password, permissions, preduzece)
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
    if (this.userEditForm.get(Authority.NABAVKE)?.value) {
      for (let i = 0; i < this.permissions.length; i++) {
        if(this.permissions[i].name === Authority.NABAVKE){
          toReturn.push(this.permissions[i]);
        }
      }
    }
    if (this.userEditForm.get(Authority.PROFIL)?.value) {
      for (let i = 0; i < this.permissions.length; i++) {
        if(this.permissions[i].name === Authority.PROFIL){
          toReturn.push(this.permissions[i]);
        }
      }
    }
    if (this.userEditForm.get(Authority.EVIDENCIJE)?.value) {
      for (let i = 0; i < this.permissions.length; i++) {
        if(this.permissions[i].name === Authority.EVIDENCIJE){
          toReturn.push(this.permissions[i]);
        }
      }
    }
    if (this.userEditForm.get(Authority.IZVESTAJI)?.value) {
      for (let i = 0; i < this.permissions.length; i++) {
        if(this.permissions[i].name === Authority.IZVESTAJI){
          toReturn.push(this.permissions[i]);
        }
      }
    }
    if (this.userEditForm.get(Authority.PRODAJA)?.value) {
      for (let i = 0; i < this.permissions.length; i++) {
        if(this.permissions[i].name === Authority.PRODAJA){
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
