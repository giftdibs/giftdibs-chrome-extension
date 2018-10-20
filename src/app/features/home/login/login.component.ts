import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

// import {
//   environment
// } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
}
