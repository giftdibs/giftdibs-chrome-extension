import {
  Component,
  OnInit
} from '@angular/core';

import {
  ScraperConfig
} from './scraper-config';

declare var chrome: any;

const scrapeProductPage = require('giftdibs-product-page-scraper/src/scrape-product-page');
const scraperConfigs = require('giftdibs-product-page-scraper/src/product-config');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public title = 'GiftDibs';

  private defaultConfig: ScraperConfig = {
    imageSelectors: ['img'],
    nameSelectors: ['h1'],
    priceSelectors: []
  };

  constructor() { }

  public ngOnInit(): void {
    chrome.runtime.sendMessage({
      type: 'on_page_loaded'
    }, () => {
      this.fetchProductDetails();
    });
  }

  private fetchProductDetails(): void {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs: any) => {
      const tab = tabs[0];

      chrome.tabs.sendMessage(
        tab.id,
        {
          type: 'fetch_product_details',
          scraperFunction: scrapeProductPage + '',
          config: this.findConfig(tab.url)
        },
        (response: any) => {
          console.log('popup hears...', response);
          if (response && response.error) {
            throw response.error;
          }
        }
      );
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
