import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  environment
} from 'src/environments/environment';
import { SessionService } from '@giftdibs/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public siteUrl = environment.siteUrl;

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  public logout() {
    this.sessionService.clearAll();
    this.router.navigate(['/login']);
  }
}
