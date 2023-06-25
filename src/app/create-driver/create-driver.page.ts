import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { DriverServiceService } from './driver-service.service';
import { CountryCode } from './countryCode';
import { Country } from './country';
import { Language } from './language';
import { DomSanitizer } from '@angular/platform-browser';

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
  public languageList: Array<Language>
  public hidePass = true;
  public hideRepeatPass = true;
  public event : Event;

  /* Password */
  public hide = true;
  public hide2 = true;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private serviceDriver: DriverServiceService,
    private sanitizer: DomSanitizer
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
              '(?=[A-Za-z0-9@#$%^&+!_.,=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!_.,=])(?=.{8,}).*$'
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
        profile_photo: [''],
        companyAddress: ['', Validators.required],
        p_indCompany: ['+351', Validators.required],
        companyPhone: ['', Validators.required],
        countryOrigin: ['Portugal', Validators.required],
        cars: [, Validators.required],
        //Join these two after sending to backend
        otherCars: [''],
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
    this.serviceDriver.getLanguageList().subscribe((res) => {
      this.languageList = res;
    })
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
      return false;
    } else {
      let data_FirstPage: NavigationExtras = {
        queryParams: {
          email: '' + this.driverForm.get('email').value,
          password: '' + this.driverForm.get('password').value,
          name: '' + this.driverForm.get('fName').value,
          dob: '' + this.driverForm.get('birth').value,
          gender: '' + this.driverForm.get('gender').value,
          address: '' + this.driverForm.get('address').value,
          city: '' + this.driverForm.get('city').value,
          postalCode: '' + this.driverForm.get('postal').value,
          country: '' + this.driverForm.get('country').value,
          phone:
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

  async loadImagePH_DOC(event: any, variable: String) {
    this.event = event;
    if(event.target.files.length == 0){
      return;
    }
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file)
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl)
    this.driverForm.get('' + variable).setValue(sanitizedUrl);

  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.driverForm.get('birth').setValue(date, {
      onlyself: true,
    });
  }
}
