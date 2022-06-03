import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/user.model";
import {IClient} from "../../shared/client.model";
import {UserService} from "../../services/login/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddNewClientService} from "../../services/add-new-client/add-new-client.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  company: IClient;
  companyForm: FormGroup;
  enableEditIndex: number;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private companyService: AddNewClientService
  ) {
    this.enableEditIndex = -1

    this.user = new User(-1, "","","","","",[],[],-1)
    this.company = new IClient(-1, "","","","","","","","", "", "", true)

    this.companyForm = this.formBuilder.group({
      naziv: [this.company.naziv, [Validators.required]],
      PIB: [
        this.company.pib, [
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.minLength(9),
          Validators.maxLength(9)
        ]
      ],
      adresa: [this.company.adresa, [Validators.required]],
      grad: [this.company.grad, [Validators.required]],
      telefon: [this.company.telefon],
      racun: [this.company.racun],
      email: [this.company.email],
      webAdresa: [this.company.webAdresa],
      fax: [this.company.fax],
    });
  }

  ngOnInit() {
    this.enableEditIndex = -1;
    this.getCurrentUser()
  }

  private getCurrentUser() {
    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user;
      this.getCurrentCompany(this.user.preduzeceId)
    });
  }

  private getCurrentCompany(preduzeceId: number) {
    this.companyService.getClientById(preduzeceId).subscribe((company) => {
      this.company = company
      this.buildForm()
      console.log(this.company)
    });
  }

  private buildForm() {
    this.companyForm = this.formBuilder.group({
      naziv: [this.company.naziv, [Validators.required]],
      PIB: [
        this.company.pib, [
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.minLength(9),
          Validators.maxLength(9)
        ]
      ],
      adresa: [this.company.adresa, [Validators.required]],
      grad: [this.company.grad, [Validators.required]],
      telefon: [this.company.telefon],
      racun: [this.company.racun],
      email: [this.company.email],
      webAdresa: [this.company.webAdresa],
      fax: [this.company.fax],
    });
  }

  isAdmin() {
    return sessionStorage.getItem('admin') != null;
  }

  updateCompany() {
    this.company.naziv = this.companyForm.get('naziv')?.value
    this.company.pib = this.companyForm.get('PIB')?.value
    this.company.adresa = this.companyForm.get('adresa')?.value
    this.company.grad = this.companyForm.get('grad')?.value
    this.company.telefon = this.companyForm.get('telefon')?.value
    this.company.racun = this.companyForm.get('racun')?.value
    this.company.email = this.companyForm.get('email')?.value
    this.company.webAdresa = this.companyForm.get('webAdresa')?.value
    this.company.fax = this.companyForm.get('fax')?.value

    this.companyService.updateClient(this.company).subscribe((company) => {
      this.company = company
    })
  }
}
