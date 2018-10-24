import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  SessionService,
  SessionUser
} from '@giftdibs/session';

import {
  environment
} from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public siteUrl = environment.siteUrl;
  public sessionUser: SessionUser;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.sessionService.userStream.subscribe((user) => {
      this.sessionUser = user;
      this.changeDetector.markForCheck();
    });
  }

  public logout() {
    this.sessionService.clearAll();
    this.router.navigate(['/login']);
  }
}
