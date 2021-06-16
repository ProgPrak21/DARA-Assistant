import * as con from './connectors/.';
import type { connector } from './connectors/.';

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

let connectors: Array<connector> = [];

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

function getConnector(tab: chrome.tabs.Tab) {
  const { hostname } = new URL(tab.url ?? "");
  const connector = connectors.find(connector => hostname.includes(connector.hostname));
  return connector;
}

chrome.runtime.onMessage.addListener(async (message) => {
  console.log("Message received in background!", message);

  if (message.action) {
    const tab = await getCurrentTab();
    const connector = getConnector(tab);
    if (connector && tab) {
      console.log(`Found matching ${connector.name} connector.`, connector);
      const { action } = message;
      if (tab.url !== connector.requestUrl) {
        chrome.tabs.update({ url: connector.requestUrl }, () => {
          chrome.tabs.onUpdated.addListener(function onUpdated(tabIdL, changeInfoL, tabL) {
            // Make sure the correct url has been loaded
            if (
              tabL.status === "complete" &&
              changeInfoL.status === "complete" &&
              tabIdL === tab.id 
            ) {
            if (tabL.url === connector.requestUrl){
              chrome.tabs.onUpdated.removeListener(onUpdated);
              console.log("Our tab has been loaded.", tabL, changeInfoL);
              console.log(`Injecting ${action} script`);
              injectFunction(tabIdL, (<any>connector)[action]);
            } else {
              console.log("We didn't reach requestUrl, probably the user still needs to login.")
              chrome.runtime.sendMessage({ actionResponse: "Couldn't load the request page, probably you need to login first." });
            }
          }
          });
        });
      } else {
        console.log(`Injecting ${action} script`);
        injectFunction(<number>tab.id, (<any>connector)[action]);
      }
    } else {
      console.log(`Could not find connector matching ${tab.url}.`);
    }
  } else if (message.getActions) {
    const tab = await getCurrentTab();
    const connector = getConnector(tab);
    if (connector && tab) {
      console.log('Sending response', { actions: connector.actions });
      chrome.runtime.sendMessage({ actions: connector.actions });
    } else {
      console.log(`Could not find connector matching ${tab.url}.`);
    }
  } else if (message.downloadUrl) {
    chrome.downloads.download({
      url: message.downloadUrl,
      filename: message.downloadName
    });
  }
});