import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  environment
} from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public siteUrl = environment.siteUrl;
}
