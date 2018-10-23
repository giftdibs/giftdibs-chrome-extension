import {
  Injectable
} from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import {
  SessionService
} from '@giftdibs/session';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.validateOrRedirect(state.url);
  }

  // Using native Window pathname until Angular provides query params in route:
  // https://github.com/angular/angular/issues/12411
  public canLoad(route: Route): boolean {
    const url = window.location.pathname;
    return this.validateOrRedirect(url);
  }

  private validateOrRedirect(redirectUrl: string): boolean {
    if (this.sessionService.isLoggedIn) {
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: {
        redirectUrl
      }
    });

    return false;
  }
}
