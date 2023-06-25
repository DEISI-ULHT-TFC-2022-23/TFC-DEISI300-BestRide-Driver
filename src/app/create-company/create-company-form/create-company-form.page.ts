import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { distinctUntilChanged } from 'rxjs/operators';
import { CompanyServiceService } from '../company-service.service';
import { Country } from './country';
import { CountryCode } from './countryCode';

@Component({
  selector: 'app-create-company-form',
  templateUrl: './create-company-form.page.html',
  styleUrls: ['./create-company-form.page.scss'],
})
export class CreateCompanyFormPage implements OnInit {
  companyGroup: FormGroup;
  submited = false;
  countryCode: Array<CountryCode>;
  public countryList: Array<Country>;
  private email: any;

  /* Password */
  public hide = true;
  public hide2 = true;

  public current_year = new Date().getFullYear();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private srvc: CompanyServiceService,
    private menuCtrl: MenuController
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.email) {
        this.email = params.email;
      }
    });
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.companyGroup = this.formBuilder.group(
      {
        name: ['', Validators.required],
        rnat_code: ['', Validators.required],
        rnat_year: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        address: ['', Validators.required],
        city: ['', Validators.required],
        postal_code: ['', Validators.required],
        country: ['Portugal', Validators.required],
        phone_ind: ['+351', Validators.required],
        phone: ['', Validators.required],
        nif: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        pass: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=[A-Za-z0-9@#$%^&+!_.,=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!_.,=])(?=.{8,}).*$'
            ),
          ],
        ],
        passConfirm: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );

    this.srvc.getCountryCode().subscribe((res) => {
      this.countryCode = res;
    });
    this.srvc.getCountryList().subscribe((res) => {
      this.countryList = res;
    });
  }

  change(event: any) {
    this.companyGroup
      .get('rnat_code')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((val) => {
        if (val.length == 5) {
          const prevElement = document.getElementById('code');
          prevElement.focus();
        }
      });
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['pass'].value === frm.controls['passConfirm'].value
      ? null
      : { mismatch: true };
  }

  public submitForm() {
    this.submited = true;
    if (!this.companyGroup.valid) {
      return false;
    } else {
      const form_data = {
        email: '' + this.email,
        password: '' + this.companyGroup.get('pass').value,
        name: '' + this.companyGroup.get('name').value,
        address: '' + this.companyGroup.get('address').value,
        city: '' + this.companyGroup.get('city').value,
        country: '' + this.companyGroup.get('country').value,
        postal_code: '' + this.companyGroup.get('postal_code').value,
        nif: '' + this.companyGroup.get('nif').value,
        phone_number:
          this.companyGroup.get('phone_ind').value +
          '' +
          this.companyGroup.get('phone').value,
        rnat_license:
          '' +
          this.companyGroup.get('rnat_code').value +
          '/' +
          this.companyGroup.get('rnat_year').value,
      };
      console.log(form_data)
      this.srvc.createCompany(form_data);
    }
  }

  get errorControl() {
    return this.companyGroup.controls;
  }
}
