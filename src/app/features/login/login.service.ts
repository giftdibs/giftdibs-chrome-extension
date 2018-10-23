import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from 'src/environments/environment';

@Injectable()
export class LoginService {
  private resourceUrl = environment.apiUrl + '/auth';

  constructor(
    private http: HttpClient
  ) { }

  public login(emailAddress: string, password: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/login`, { emailAddress, password });
  }

  public loginUsingFacebook(facebookUserAccessToken: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/login-facebook`, { facebookUserAccessToken });
  }
}
