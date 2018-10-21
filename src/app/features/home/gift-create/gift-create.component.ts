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

import { GiftCreateService } from './gift-create.service';
import { SessionService } from '@giftdibs/session';
import { finalize } from 'rxjs/operators';

// import {
//   environment
// } from 'src/environments/environment';

@Component({
  selector: 'app-gift-create',
  templateUrl: './gift-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftCreateComponent implements OnInit {
  public errors: any[] = [];
  public giftForm: FormGroup;
  public wishLists: any[];
  public isLoading = true;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private giftCreateService: GiftCreateService,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.createForm();
    const userId = this.sessionService.user.id;
    this.giftCreateService.getAllWishListsByUserId(userId)
      .subscribe((wishLists: any[]) => {
        if (!wishLists || wishLists.length === 0) {
          alert('You need to create a wish list!');
          // TODO: Let them create a new wish list?
          return;
        }

        this.wishLists = wishLists;
        this.resetForm();
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }

  public submit(): void {
    if (this.giftForm.disabled) {
      return;
    }

    this.isLoading = true;
    this.giftForm.disable();
    this.changeDetector.markForCheck();

    const formData: any = this.giftForm.value;

    this.giftCreateService.create(formData.wishListId, formData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.giftForm.enable();
          this.changeDetector.markForCheck();
        })
      )
      .subscribe(
        (result: any) => {
          // const giftId = result.data.giftId;

          // if (this.newImageFile) {
          //   this.uploadImage(this.newImageFile, giftId).subscribe(
          //     () => {
          //       alert('Gift created with an image!');
          //       this.giftForm.enable();
          //     },
          //     (err: any) => {
          //       alert(err.error.message);
          //       this.giftForm.enable();
          //     }
          //   );
          //   return;
          // }

          alert('Gift created without an image.');
          this.resetForm();
        },
        (err: any) => {
          const error = err.error;
          alert(error.message);
          this.errors = error.errors;
        }
      );
  }

  private createForm(): void {
    this.giftForm = this.formBuilder.group({
      budget: undefined,
      externalUrls: this.formBuilder.array([]) as any,
      imageUrl: new FormControl(),
      name: new FormControl(null, [
        Validators.required
      ]),
      notes: undefined,
      priority: 3,
      quantity: 1,
      wishListId: new FormControl(null, [
        Validators.required
      ])
    });
  }

  private resetForm(): void {
    this.giftForm.reset();
    this.giftForm.get('wishListId').setValue(this.wishLists[0].id);
  }
}
