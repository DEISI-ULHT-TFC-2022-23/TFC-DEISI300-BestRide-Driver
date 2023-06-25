import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { AlertPopup } from '../shared/services/alert-popup';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  private login_url = '/loginEnterprise/';
  private url_company_get_id: String = '/getEmpresaId/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertPopup,
    private authService: AuthenticationService
  ) {}

  public getCompanyId(email: string): Observable<any> {
    return this.http.get(environment.apiUrl + this.url_company_get_id + email);
  }

  public login(data: any) {
    this.http.post(environment.apiUrl + this.login_url, data).subscribe(
      (res) => {
        // save acess token
        localStorage.setItem('token', res['token']);
        //navigate home

        this.getCompanyId(data['email']).subscribe((res) => {
          localStorage.setItem('userID', res[0].idEmpresaDriver);
        });

        localStorage.setItem('accountRole', 'company');
        this.authService.login();
      },
      (e) => {
        this.alert.presentAlert('Login Failed', e.error, 'Try Again');
      }
    );
  }
}
