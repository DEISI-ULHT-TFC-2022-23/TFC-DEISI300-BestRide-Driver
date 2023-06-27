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

  public create_contact(data: any) {
    return this.http.post(environment.apiUrl + this.createDriverUrl, data);
  }

  public upload_image(email: string, file: File, name: string) {
    console.log("entrou")
    const formData = new FormData();
    formData.append('image',file);
    formData.append('name', name);

    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data; boundary=---", // Substitua o valor do boundary pelo seu valor correto
    });

    return this.http.put(environment.apiUrl + this.upload_imageURl + email, formData, { headers });
  };
}
