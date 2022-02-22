import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryCode } from './create-company-form/countryCode';
@Injectable({
  providedIn: 'root',
})
export class CompanyServiceService {
  private url_create_company: String = '/createDriverEnterprise/';
  private url_company_get_id: String = '/getEmpresaId/';

  account_id: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {}

  public createCompany(data: any) {
    localStorage.setItem('emailCache', data['email']);
    localStorage.setItem('passCache', data['password']);
    this.http
      .post(environment.apiUrl + this.url_create_company, data)
      .subscribe((response) => {
        console.log(response);
      }),
      (err) => {
        console.log(err);
      };
  }

  public getCompanyId(name: string): Observable<any> {
    return this.http.get(environment.apiUrl + this.url_company_get_id + name);
  }

  public getCountryCode(): Observable<CountryCode[]> {
    return this.http.get<CountryCode[]>('./../assets/countryCodes.json');
  }

  public getCountryList(): Observable<CountryCode[]> {
    return this.http.get<CountryCode[]>('./../assets/countries.json');
  }
}
