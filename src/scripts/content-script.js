chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.type === 'fetch_product_details') {
      if (!request.scraperFunction) {
        sendResponse({
          error: 'Please provide a scraper function!'
        });
        return;
      }

      if (!request.config) {
        sendResponse({
          error: 'Please provide a scraper config!'
        });
        return;
      }

      eval(`${request.scraperFunction}`);

      // Let the script "breathe".
      setTimeout(() => {
        const promise = eval(`scrapeProductPage(${JSON.stringify(request.config)});`);

        promise.then((details) => {
          sendResponse({
            result: details
          });
        })
        .catch((err) => {
          sendResponse({
            error: err.message
          });
        });
      });

      // Make this callback an async response:
      return true;
    }
  }
);
