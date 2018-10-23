import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable, Observer
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

  public uploadGiftThumbnail(file: any, giftId: string): Observable<any> {
    return this.uploadFile(file, `${this.resourceUrl}/gifts/${giftId}/thumbnails`);
  }

  // TODO: Consider wrapping this functionality in a new NPM module to
  // be shared by all Angular clients.
  private uploadFile(file: any, url: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      const data = new FormData();
      data.append('file', file);

      this.http.post(
        url,
        data
      ).subscribe(
        (result: any) => {
          observer.next(result);
          observer.complete();
        },
        (err: any) => {
          observer.error(err);
          observer.complete();
        }
      );
    });
  }
}
