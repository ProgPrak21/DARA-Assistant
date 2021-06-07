import {buildConfig} from  './connectors/.';

let connectors:any[] = [];
// initialize extension
chrome.runtime.onInstalled.addListener(async () => {
  connectors = await buildConfig();
});

//Inject function asynchronously
function injectFunction(tabId: number, functionName: Function) {
  const functionString = functionName.toString();
  const functionBody = functionString.slice(
    functionString.indexOf("{") + 1,
    functionString.lastIndexOf("}")
  );
  chrome.tabs.executeScript(tabId, {
    code: `(async () => {${functionBody}})()`,
  });
}


console.log("Hello from background script!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background!", message);
  if (["request", "check", "download"].includes(message.type)) {
    // Listen for tabs update
    chrome.tabs.onUpdated.addListener(async function onUpdated(
      tabId,
      changeInfo,
      tab
    ) {
      //check if the tab has been loaded
      console.log("Received onUpdated event.", tab, changeInfo);
      if (
        tab.status === "complete" &&
        changeInfo.status === "complete" &&
        tabId === message.id
      ) {
        console.log("Our tab has been loaded.", tab, changeInfo);

        // Now we need to find out which connector to use
        const { hostname } = new URL(tab.url ?? "");
        
        for (let connector of connectors) {
          if (hostname.includes(connector.hostname)) {
            console.log(`Found matching ${connector.name} connector.`);
            const { type } = message;

            console.log(`Injecting ${type} script`);
            injectFunction(tabId, connector[type]);
            break;
          }
        }

        chrome.tabs.onUpdated.removeListener(onUpdated);
      }
    });
  }
});

/**
 * Implement url based extension activation via page_action 
 */
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With new rules
    let connector;
    let conditions = [];
    // For every available connector
    for (connector of config) {
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
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }
      ]);
  });
});