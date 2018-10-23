(function () {
  let isLoaded = false;
  chrome.tabs.onUpdated.addListener((tabId, info) => {
    if (info.status === 'complete') {
      isLoaded = true;
    }
  });

  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request.type === 'on_page_loaded') {
        const interval = setInterval(() => {
          if (isLoaded) {
            clearInterval(interval);
            sendResponse({
              type: 'content_loaded'
            });
          }
        }, 400);


        // Make this callback an async response:
        return true;
      }
    }
  );
}());
