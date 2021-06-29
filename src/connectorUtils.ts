export function pause(time: number) {
  return new Promise(
    (resolve) => setTimeout(resolve, time)
  );
}

export function waitForElement(selector: string) {
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

export function waitForElements(selector: string) {
  return new Promise<any | null>(function (resolve, reject) {
    let el = Array.from(document.querySelectorAll<HTMLElement>(selector));
    el.forEach((element) => {
      if (element) { resolve(el); }
    });

    new MutationObserver((mutationRecords, observer) => {
      // Query for elements matching the specified selector
      const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
      elements.forEach((element) => {
        if (element) {
          resolve(elements);
          //Once we have resolved we don't need the observer anymore.
          observer.disconnect();
        }
      })
    })
      .observe(document.documentElement, {
        childList: true,
        subtree: true
      });
  });
}

export function sendPending() {
  chrome.runtime.sendMessage({ actionResponse: "A previous request is still pending.", actionResult: false });
}

export function sendSuccess() {
  chrome.runtime.sendMessage({ actionResponse: "You just requested your data.", actionResult: true });
}