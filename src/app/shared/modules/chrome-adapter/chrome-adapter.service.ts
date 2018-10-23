import {
  Injectable,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  BehaviorSubject,
  Observable,
  Observer,
  of
} from 'rxjs';

import {
  concatMap
} from 'rxjs/operators';

import {
  ScraperConfig
} from './scraper-config';

import {
  ScraperResult
} from './scraper-result';

declare var chrome: any;

const scrapeProductPage = require('giftdibs-product-page-scraper/src/scrape-product-page');
const scraperConfigs = require('giftdibs-product-page-scraper/src/product-config');

@Injectable()
export class ChromeExtensionAdapter implements OnInit, OnDestroy {
  public get tabUrl(): Observable<string> {
    if (this._tabUrl) {
      return of(this._tabUrl);
    }

    return Observable.create((observer) => {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs: any) => {
        const tab = tabs[0];

        this._tabUrl = tab.url;

        observer.next(this._tabUrl);
        observer.complete();
      });
    });
  }

  private _tabUrl: string;

  private defaultConfig: ScraperConfig = {
    imageSelectors: ['img'],
    nameSelectors: ['h1'],
    priceSelectors: []
  };

  private ready = new BehaviorSubject<boolean>(false);

  public ngOnInit(): void {
    chrome.runtime.sendMessage({
      type: 'on_page_loaded'
    }, () => {
      this.ready.next(true);
    });
  }

  public ngOnDestroy(): void {
    this.ready.complete();
  }

  public scrapeActiveTabContents(): Observable<ScraperResult> {
    return this.ready.pipe(
      concatMap(() => {
        return this.fetchProductDetails();
      })
    );
  }

  private fetchProductDetails(): Observable<ScraperResult> {
    return Observable.create((observer: Observer<ScraperResult>) => {
      if (!chrome.tabs) {
        observer.next({
          images: [],
          name: '',
          price: 0
        });

        observer.complete();
      }

      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs: any) => {
        const tab = tabs[0];

        this._tabUrl = tab.url;

        chrome.tabs.sendMessage(
          tab.id,
          {
            type: 'fetch_product_details',
            scraperFunction: scrapeProductPage + '',
            config: this.findConfig(tab.url)
          },
          (response: any) => {
            if (response && response.error) {
              throw response.error;
            }

            observer.next(response.result);
            observer.complete();
          }
        );
      });
    });
  }

  private findConfig(url: string): ScraperConfig {
    // Derive hostname.
    // See: https://stackoverflow.com/a/15979390/6178885
    const parser = document.createElement('a');
    parser.href = url;
    const hostname = parser.hostname.replace('www.', '');
    return scraperConfigs[hostname] || this.defaultConfig;
  }
}
