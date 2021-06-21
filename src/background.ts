import * as con from "./connectors/.";
//import type { connector } from "./connectors/.";

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

async function getConnector(): Promise<
  [chrome.tabs.Tab, any , string]
> {
  const connectors = Object.values(con);
  const tab = await getCurrentTab();
  const { hostname } = new URL(tab.url ?? "");
  const connector = connectors.find((connector) =>
    hostname.includes(connector.hostname)
  );
  return [tab, connector, hostname];
}

async function verifyUrl(tab: chrome.tabs.Tab, requestUrl: string) {
  return new Promise((resolve, reject) => {
    if (tab?.url !== requestUrl) {
      chrome.tabs.update({ url: requestUrl }, () => {
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
            if (tabL?.url === requestUrl) {
              chrome.tabs.onUpdated.removeListener(onUpdated);
              console.log("RequestUrl has been loaded.", tabL, changeInfoL);
              resolve(true);
            } else {
              console.log("Didn't reach requestUrl.");
              resolve(false);
            }
          }
        });
      });
    } else {
      resolve(true);
    }
  });
}

chrome.runtime.onMessage.addListener(async (message) => {
  console.log("Message received in background!", message);

  if (message.action) {
    const [tab, connector, hostname] = await getConnector();
    if (connector && tab) {
      console.log(`Found matching ${connector.name} connector.`, connector);
      const { action } = message;
      if (connector.requestUrl) {
        if (await verifyUrl(tab, connector.requestUrl)) {
          console.log(`Send Message to content script to execute ${action}`);
          chrome.tabs.sendMessage(<number>tab.id, { action: action });
        } else {
          chrome.runtime.sendMessage({
            actionResponse:
              "Couldn't load the request page, probably, you need to login first.",
          });
        }
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
