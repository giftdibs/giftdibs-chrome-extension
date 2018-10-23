import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import {
  SessionService
} from '@giftdibs/session';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public isLoggedIn = false;

  constructor(
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.isLoggedIn = this.sessionService.isLoggedIn;
  }
}
