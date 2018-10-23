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
  Validators,
  FormArray
} from '@angular/forms';

import { GiftCreateService } from './gift-create.service';

import { SessionService } from '@giftdibs/session';

import { finalize } from 'rxjs/operators';

import { ChromeExtensionAdapter } from 'src/app/shared/modules/chrome-adapter';
import { ScraperResult } from 'src/app/shared/modules/chrome-adapter/scraper-result';
import { Observable } from 'rxjs';

// import {
//   environment
// } from 'src/environments/environment';

@Component({
  selector: 'app-gift-create',
  templateUrl: './gift-create.component.html',
  providers: [
    ChromeExtensionAdapter
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftCreateComponent implements OnInit {
  public errors: any[] = [];
  public giftForm: FormGroup;
  public wishLists: any[];
  public isLoading = true;

  public get imageUrlValue(): string {
    return this.giftForm.get('imageUrl').value;
  }

  private get externalUrls(): FormArray {
    return <FormArray>this.giftForm.get('externalUrls');
  }

  private newImageFile: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private chromeExtension: ChromeExtensionAdapter,
    private formBuilder: FormBuilder,
    private giftCreateService: GiftCreateService,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.createForm();

    this.chromeExtension.scrapeActiveTabContents()
      .subscribe((result: ScraperResult) => {
        // TODO: let the user choose!
        const imageDataUrl = result.images[0].dataUrl;
        this.newImageFile = this.dataURLtoFile(imageDataUrl, 'temp.jpg');

        this.giftForm.get('imageUrl').setValue(imageDataUrl);
        this.giftForm.get('budget').setValue(result.price);
        this.giftForm.get('name').setValue(result.name);

        this.chromeExtension.tabUrl.subscribe((tabUrl: string) => {
          this.externalUrls.push(
            this.formBuilder.group(
              Object.assign({
                price: undefined,
                url: undefined
              }, {
                price: result.price,
                url: tabUrl
              })
            )
          );

          this.changeDetector.markForCheck();
        });
      });

    const userId = this.sessionService.user.id;

    this.giftCreateService.getAllWishListsByUserId(userId)
      .subscribe((wishLists: any[]) => {
        if (!wishLists || wishLists.length === 0) {
          alert('You need to create a wish list!');
          // TODO: Let them create a new wish list?
          return;
        }

        this.wishLists = wishLists;
        this.giftForm.get('wishListId').setValue(this.wishLists[0].id);
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
          const giftId = result.data.giftId;

          if (this.newImageFile) {
            this.uploadImage(this.newImageFile, giftId)
              .pipe(
                finalize(() => {
                  this.giftForm.enable();
                  this.changeDetector.markForCheck();
                })
              )
            .subscribe(
              () => {
                alert('Gift created with an image!');
                this.createForm();
                this.giftForm.get('wishListId').setValue(this.wishLists[0].id);
              },
              (err: any) => {
                alert(err.error.message);
              }
            );

            return;
          }

          alert('Gift created without an image.');
          this.createForm();
          this.giftForm.get('wishListId').setValue(this.wishLists[0].id);
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

  // Convert data URL to File.
  // https://stackoverflow.com/a/38936042/6178885
  private dataURLtoFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]);

    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  private uploadImage(file: any, giftId: string): Observable<any> {
    return this.giftCreateService.uploadGiftThumbnail(file, giftId);
  }
}
