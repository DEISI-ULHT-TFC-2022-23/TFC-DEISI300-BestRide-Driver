import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { DriverServiceService } from './driver-service.service';
import { CountryCode } from './countryCode';
import { Country } from './country';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.page.html',
  styleUrls: ['./create-driver.page.scss'],
})
export class CreateDriverPage implements OnInit {
  public driverForm: FormGroup;
  public isSubmitted = false;
  countryCode: Array<CountryCode>;
  public countryList: Array<Country>;
  public hidePass = true;
  public hideRepeatPass = true;

  /* Password */
  public hide = true;
  public hide2 = true;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private serviceDriver: DriverServiceService
  ) {}

  ngOnInit() {
    this.driverForm = this.formBuilder.group(
      {
        fName: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$'
            ),
          ],
        ],
        passwordConfirm: ['', Validators.required],
        birth: ['', Validators.required],
        gender: ['', Validators.required],
        special: ['', Validators.required],
        languages: ['', Validators.required],
        p_ind: ['+351', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        postal: ['', Validators.required],
        academic: ['', Validators.required],
        country: ['Portugal', Validators.required],
        city: ['', Validators.required],
        companyName: ['', Validators.required],
        companyAddress: ['', Validators.required],
        companyPhone: ['', Validators.required],
        countryOrigin: ['', Validators.required],
        cars: ['', Validators.required],
        hoursAvailableSince: ['', Validators.required],
        hoursAvailableUntil: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );

    this.serviceDriver.getCountryCode().subscribe((res) => {
      this.countryCode = res;
    });
    this.serviceDriver.getCountryList().subscribe((res) => {
      this.countryList = res;
    });
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value ===
      frm.controls['passwordConfirm'].value
      ? null
      : { mismatch: true };
  }

  public submitForm() {
    this.isSubmitted = true;
    if (!this.driverForm.valid) {
      console.log('not valid');
      console.log(this.driverForm.errors);

      return false;
    } else {
      let data_FirstPage: NavigationExtras = {
        queryParams: {
          email: '' + this.driverForm.get('email').value,
          password: '' + this.driverForm.get('password').value,
          name: '' + this.driverForm.get('fName').value,
          dob: '' + this.driverForm.get('birth').value,
          gender: '' + this.driverForm.get('gender').value,
          adress: '' + this.driverForm.get('address').value,
          city: '' + this.driverForm.get('city').value,
          PostalCode: '' + this.driverForm.get('postal').value,
          Country: '' + this.driverForm.get('country').value,
          Phone:
            '' +
            this.driverForm.get('p_ind').value +
            '' +
            this.driverForm.get('phone').value,
        },
      };
      //saving email
      localStorage.setItem('email', this.driverForm.get('email').value);
      this.router.navigate(['/form-professional'], data_FirstPage);
    }
  }

  get errorControl() {
    return this.driverForm.controls;
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.driverForm.get('birth').setValue(date, {
      onlyself: true,
    });
  }
}
