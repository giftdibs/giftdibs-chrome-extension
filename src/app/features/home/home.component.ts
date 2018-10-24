import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import {
  SessionService
} from '@giftdibs/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public isLoggedIn = false;

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.isLoggedIn = this.sessionService.isLoggedIn;

    if (this.isLoggedIn) {
      this.router.navigate(['/create']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
