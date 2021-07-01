export function pause(time: number) {
  return new Promise(
    (resolve) => setTimeout(resolve, time)
  );
}

export function waitForElement(selector: string) {
  return new Promise<HTMLElement | undefined>(function (resolve, reject) {
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

    let id = setTimeout(() => {
      clearTimeout(id);
      resolve(undefined);
    }, 2500)
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

    let id = setTimeout(() => {
      clearTimeout(id);
      resolve(undefined);
    }, 2500)
  });
}

export const execInIframe = async (fun: Function) => {

  const findFrame = () => {
    const iframes = Array.from(document.querySelectorAll("iframe"));
    if (iframes) {
      return iframes.find(iframe => iframe.contentWindow)
    } else {
      return undefined;
    }
  }

  let iframe = findFrame();

  while (iframe === undefined) {
    console.log('Iframes still not loaded, trying again.');
    await pause(1000);
    iframe = findFrame();
  }

  console.log('Got Iframe:', iframe);

  if (iframe.contentWindow?.document.readyState === "complete") {
    fun(iframe);
  } else {
    iframe.addEventListener("load", async () => {
      fun(iframe);
    });
  }
}

export function sendPending() {
  chrome.runtime.sendMessage({ actionResponse: "⏳ A previous request is still pending." });
}

export function sendSuccess() {
  chrome.runtime.sendMessage({ actionResponse: "🎉 You just requested your data." });
}

export function send(input: string) {
  chrome.runtime.sendMessage({ actionResponse: input });
}