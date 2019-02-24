import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { catchError,tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignupComponent } from './user/signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'https://chatapi.edwisor.com';
  
  constructor(private httpClient: HttpClient) { }

  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  public signUpFunction(data): Observable<any>{

    const params = new HttpParams()
          .set('firstName', data.firstName)
          .set('lastName', data.lastName)
          .set('mobile', data.mobile)
          .set('email', data.email)
          .set('password', data.password)
          .set('apiKey', data.apiKey)

          return this.httpClient.post(this.baseUrl + '/api/v1/users/signup', params);

  }

  public login(data): any {
    return this.httpClient.post(this.baseUrl + '/api/v1/users/login',data);
  }

}
