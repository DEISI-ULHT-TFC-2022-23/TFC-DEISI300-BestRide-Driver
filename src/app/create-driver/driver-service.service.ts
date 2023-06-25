import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryCode } from './countryCode';
import { Language } from './language';

@Injectable({
  providedIn: 'root',
})
export class DriverServiceService {
  private url_cognito_create: string = '/createDriver/';
  private url_create_contact: string = '/postEmergencyContact/';

  constructor(private http: HttpClient, private router: Router) {}

  public getCountryCode(): Observable<CountryCode[]> {
    return this.http.get<CountryCode[]>('./../assets/countryCodes.json');
  }
  public getCountryList(): Observable<CountryCode[]> {
    return this.http.get<CountryCode[]>('./../assets/countries.json');
  }
  public getLanguageList(): Observable<Language[]> {
    return this.http.get<Language[]>('./../assets/languages.json');
  }

  public create_emergency(data: any): void {
    /*
    this.http
      .post(environment.apiUrl + this.url_create_contact, data)
      .subscribe((response) => {
        console.log(response);
      }),
      (err) => {
        console.log(err);
      };
      */
  }

  public create_contact(data: any) {
    const data_form = {
      email: data['first_page'].email,
      password: data['first_page'].password,
      name: data['first_page'].name,
      dob: data['first_page'].dob,
      gender: data['first_page'].gender,
      address: data['first_page'].address,
      city: data['first_page'].city,
      postalCode: data['first_page'].postalCode,
      country: data['first_page'].country,
      nif: data['second_page'].nif,
      RNATLicense: data['second_page'].rnaat_l,
      driverLicense: data['second_page'].driver_l,
      phone: data['first_page'].phone,
      nationality: data['second_page'].nation,
      citizenCard: data['second_page'].cc,
      ANCATNumber: data['second_page'].ancat_l,
      IBAN: data['second_page'].bank_iban,
      docImage: data['second_page'].docImage,
    };
    this.http
      .post(environment.apiUrl + this.url_cognito_create, data_form)
      .subscribe((response) => {
        // type of account is driver
        localStorage.setItem('accountRole', 'driver');
        localStorage.setItem('email', data_form.email);
        this.router.navigate([
          '/confirm-account',
          { queryParams: { source: 'driver' } },
        ]);
      }),
      (err) => {};
  }
}
