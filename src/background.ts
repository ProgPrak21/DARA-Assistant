import * as con from './connectors/.';

export interface Connector {
  name: string;
  hostname: string;
  requestUrl: string;
  actions: Array<string>;
  check: Function;
  request: Function;
  download: Function;
};

async function getCurrentTab() {
  return new Promise<chrome.tabs.Tab>((resolve, reject) => {
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, (tabs) => {
      resolve(tabs[0]);
    })
  });
};

// Inject function asynchronously
function injectFunction(tabId: number, f: Function) {
  const functionString = f.toString();
  const functionBody = functionString.slice(
    functionString.indexOf("{") + 1,
    functionString.lastIndexOf("}")
  );
  chrome.tabs.executeScript(tabId, {
    code: `(async () => {${functionBody}})()`,
  });
}

let connectors: Array<Connector> = [];

// Initialize extension
chrome.runtime.onInstalled.addListener(async function () {

  // Make our connector modules iteratable
  for (let key of Object.keys(con)) {
    connectors.push((<any>con)[key]);
  }

  // Implement url based extension activation via page_action 
  // Replace all rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, async function () {
    // With new rules
    let conditions = [];
    // For every available connector
    for (let c of connectors) {
      conditions.push(
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostContains: c.hostname },
        })
      )
    }
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions,
        // Show the extension's page action.
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.runtime.onMessage.addListener(async (message) => {
  console.log("Message received in background!", message);

  let tab = await getCurrentTab();
  const { hostname } = new URL(tab.url ?? "");
  const connector = connectors.find(connector => hostname.includes(connector.hostname));
  if (connector) {
    console.log(`Found matching ${connector.name} connector.`, connector);
    if (["request", "download"].includes(message.type)) {

      chrome.tabs.update({ url: connector.requestUrl }, () => {
        // Listen for tabs update
        chrome.tabs.onUpdated.addListener(function onUpdated(tabId, changeInfo, tab) {
          // Make sure the tab has been loaded
          if (
            tab.status === "complete" &&
            changeInfo.status === "complete"
          ) {
            console.log("Our tab has been loaded.", tab, changeInfo);
            const { type } = message;

            switch (type) {
              case 'download':
                console.log(`Injecting check script`);
                injectFunction(tabId, connector.check);
                chrome.runtime.onMessage.addListener(function onMessage(message) {
                  if (message.requestState === 'ready') {
                    chrome.runtime.onMessage.removeListener(onMessage);
                    chrome.runtime.sendMessage({ requestState: "Your data request is ready to download." });
                    console.log(`Injecting download script`);
                    injectFunction(tabId, connector.download);
                  }
                });
                break;
              case 'request':
                console.log(`Injecting request script`);
                injectFunction(tabId, connector.request);
                chrome.runtime.sendMessage({ requestState: "You requested your data." });
                break;
            }

            chrome.tabs.onUpdated.removeListener(onUpdated);
          }
        });
      });
    } else if (message.backgroundInfo) {

      const connector: any = connectors.find((connector: any) => hostname.includes(connector.hostname));
      console.log('Sending response', { actions: connector.actions });
      chrome.runtime.sendMessage({ actions: connector.actions });
    }
  } else {
    console.log(`Could not find connector matching ${hostname}.`);
  }
});