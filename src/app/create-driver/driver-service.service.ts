import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private createDriverUrl: string = '/createDriver/';
  private upload_imageURl : string = '/updateImageDriver/';

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
    /* const data_form = {
      email: data.email,
      password: data.password,
      name: data.name,
      dob: data.dob,
      gender: data.gender,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      nif: data.nif,
      RNATLicense: data.rnaat_l,
      driverLicense: data.driver_l,
      phone: data.phone,
      nationality: data.nation,
      citizenCard: data.cc,
      ANCATNumber: data.ancat_l,
      IBAN: data.bank_iban,
      docImage: data.docImage,
    }; */


    this.http
      .post(environment.apiUrl + this.createDriverUrl, data)
      .subscribe((response) => {
        // type of account is driver
        localStorage.setItem('accountRole', 'driver');
        localStorage.setItem('email', data.email);
        /* this.router.navigate([
          '/confirm-account',
          { queryParams: { source: 'driver' } },
        ]); */
      }),
      (err) => {};
  }

  public upload_image(email: string, file: File) {
    console.log("entrou")
    const formData = new FormData();
    formData.append('image',file);

    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data; boundary=---", // Substitua o valor do boundary pelo seu valor correto
    });

    return this.http.put(environment.apiUrl + this.upload_imageURl + email, formData, { headers });
  };
}
