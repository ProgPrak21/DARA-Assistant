import * as con from "./connectors/.";
import type { connector } from "./connectors/.";

let connectors: Array<connector> = [];

async function getCurrentTab() {
  return new Promise<chrome.tabs.Tab>((resolve, reject) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        resolve(tabs[0]);
      }
    );
  });
}

// Initialize extension
chrome.runtime.onStartup.addListener(async function () {
  // Make our connector modules iteratable
  for (let key of Object.keys(con)) {
    connectors.push((<any>con)[key]);
  }
  console.log("Loaded connectors:", connectors);
});

async function getConnector(): Promise<
  [chrome.tabs.Tab, connector | undefined, string]
> {
  const tab = await getCurrentTab();
  const { hostname } = new URL(tab.url ?? "");
  const connector = connectors.find((connector) =>
    hostname.includes(connector.hostname)
  );
  return [tab, connector, hostname];
}

chrome.runtime.onMessage.addListener(async (message) => {
  console.log("Message received in background!", message);

  if (message.action) {
    const [tab, connector, hostname] = await getConnector();
    if (connector && tab) {
      console.log(`Found matching ${connector.name} connector.`, connector);
      const { action } = message;
      if (tab.url !== connector.requestUrl) {
        chrome.tabs.update({ url: connector.requestUrl }, () => {
          chrome.tabs.onUpdated.addListener(function onUpdated(
            tabIdL,
            changeInfoL,
            tabL
          ) {
            // Make sure the correct url has been loaded
            if (
              tabL.status === "complete" &&
              changeInfoL.status === "complete" &&
              tabIdL === tab.id
            ) {
              if (tabL.url === connector.requestUrl) {
                chrome.tabs.onUpdated.removeListener(onUpdated);
                console.log("Our tab has been loaded.", tabL, changeInfoL);
                console.log(
                  `Send Message to content script to execute ${action}`
                );
                chrome.tabs.sendMessage(<number>tab.id, { action: action });
              } else {
                console.log(
                  "We didn't reach requestUrl, probably the user still needs to login."
                );
                chrome.runtime.sendMessage({
                  actionResponse:
                    "Couldn't load the request page, probably you need to login first.",
                });
              }
            }
          });
        });
      } else {
        console.log(`Send Message to content script to execute ${action}`);
        chrome.tabs.sendMessage(<number>tab.id, { action: action });
      }
    } else {
      console.log(`Could not find connector matching ${tab.url}.`);
    }
  } else if (message.getActions) {
    const [tab, connector, hostname] = await getConnector();
    if (connector && tab) {
      console.log("Sending response", { actions: connector.actions });
      chrome.runtime.sendMessage({ actions: connector.actions });
    } else {
      console.log(
        `Could not find connector matching ${tab.url}.`,
        connector,
        tab,
        hostname
      );
      chrome.runtime.sendMessage({ hostname: hostname });
    }
  } else if (message.downloadUrl) {
    chrome.downloads.download({
      url: message.downloadUrl,
      filename: message.downloadName,
    });
  }
});
