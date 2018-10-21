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
  share, map
} from 'rxjs/operators';

import {
  environment
} from 'src/environments/environment';

@Injectable()
export class GiftCreateService {
  private resourceUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public create(
    wishListId: string,
    formData: any
  ): Observable<any> {
    return this.http.post(
      `${this.resourceUrl}/wish-lists/${wishListId}/gifts`,
      formData
    );
  }

  public getAllWishListsByUserId(userId: string): Observable<any[]> {
    return this.http.get(`${this.resourceUrl}/users/${userId}/wish-lists`)
      .pipe(
        map((result: any) => result.data.wishLists),
        share()
      );
  }
}
