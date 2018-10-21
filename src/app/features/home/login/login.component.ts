import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  SessionService
} from '@giftdibs/session';

import {
  LoginService
} from './login.service';

// import {
//   environment
// } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public errors: any[] = [];
  public loginForm: FormGroup;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.sessionService.clearAll();
  }

  public submit(): void {
    if (this.loginForm.disabled) {
      return;
    }

    this.loginForm.disable();
    this.errors = [];
    this.changeDetector.markForCheck();

    const formData = this.loginForm.value;
    this.loginService.login(formData.emailAddress, formData.password)
      .subscribe(
        () => {
          this.redirect();
        },
        (err: any) => {
          this.errors = err.error.errors;
          alert(err.error.message);
          this.loginForm.enable();
          this.changeDetector.markForCheck();
        }
      );
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      emailAddress: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  // TODO: login via facebook

  private redirect(): void {
    alert('Login successful!');
  }
}
