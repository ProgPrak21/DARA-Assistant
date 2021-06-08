import { buildConfig } from './connectors/.';

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

let connectors: any[] = [];
console.log("Hello from background script!");

// Initialize extension
chrome.runtime.onInstalled.addListener(async function () {
  connectors = await buildConfig();

  // Implement url based extension activation via page_action 
  // Replace all rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    // With new rules
    let connector;
    let conditions = [];
    // For every available connector
    for (connector of connectors) {
      conditions.push(
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostContains: connector.hostname },
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background!", message);
  if (["request", "download"].includes(message.type)) {
    // We need to find out which connector to use
    const { hostname } = new URL(message.url ?? "");
    const connector = connectors.find(connector => hostname.includes(connector.hostname));
    if (connector) {
      console.log(`Found matching ${connector.name} connector.`, connector);
      chrome.tabs.update({ url: connector.requestUrl }, () => {
        // Listen for tabs update
        chrome.tabs.onUpdated.addListener(async function onUpdated(
          tabId,
          changeInfo,
          tab
        ) {
          // Make sure the tab has been loaded
          if (
            tab.status === "complete" &&
            changeInfo.status === "complete" &&
            tabId === message.id
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
                    console.log(`Injecting download script`);
                    injectFunction(tabId, connector.download);
                  }
                });
                break;
              case 'request':
                console.log(`Injecting request script`);
                injectFunction(tabId, connector.request);
            }

            
            injectFunction(tabId, connector[type]);
            chrome.tabs.onUpdated.removeListener(onUpdated);
          }
        });
      }
      );
    } else {
      console.log(`Could not find connector matching ${hostname}.`);
    }
  }
});