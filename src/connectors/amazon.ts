export const name = 'amazon';
export const hostname = 'amazon.com';
export const requestUrl = 'https://www.amazon.com/gp/privacycentral/dsar/preview.html';
export const actions = ['request'];

export const request = async () => {
  const pause = (time: number) =>
    new Promise(
      (resolve) => setTimeout(resolve, time)
    );

  const waitForElement = (selector: string) => {
    return new Promise<HTMLElement | null>(function (resolve, reject) {
      let el = document.querySelector<HTMLElement>(selector);
      if (el) { resolve(el); }

      new MutationObserver((mutationRecords, observer) => {
        // Query for elements matching the specified selector
        const element = document.querySelector<HTMLElement>(selector);
        if (element) {
          resolve(element);
          //Once we have resolved we don't need the observer anymore.
          observer.disconnect();
        }
      })
        .observe(document.documentElement, {
          childList: true,
          subtree: true
        });
    });
  }

  await pause(200);
  (await waitForElement("span.a-button-text,a-declarative[id='a-autoid-0-announce']"))?.click();
  (await waitForElement("a[id='aedu-dsar-data-categories-dropdown_15']"))?.click();
  (await waitForElement("input.a-button-input[aria-labelledby='aedu-dsar-create-btn-announce']"))?.click();
  chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};

export const download = async () => {
  // afaik not possible
};
