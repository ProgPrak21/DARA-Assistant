import * as con from "./connectors/.";

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

async function getConnector(message: any): Promise<
  [any, any, string]
> {
  const connectors = Object.values(con);
  let tab: any, connector: any, hostname: string;

  tab = await getCurrentTab();
  message.hostname
    ? hostname = message.hostname
    : { hostname } = new URL(tab.url ?? "");
  connector = connectors.find((connector) =>
    hostname.includes(connector.name)
  );
  return [tab, connector, hostname];
}

async function loadUrl(tab: chrome.tabs.Tab, requestUrl: string, create: boolean) {
  return new Promise((resolve, reject) => {
    if (tab?.url === requestUrl) {
      resolve(tab);
    } else {
      if (create) {
        chrome.tabs.create({ url: requestUrl, active: true }, (createdTab) => {
          chrome.tabs.onUpdated.addListener(function onUpdated(
            newTabId,
            changeInfo,
            newTab
          ) {
            // Make sure the correct url has been loaded
            if (
              newTab.status === "complete" &&
              changeInfo.status === "complete" &&
              newTabId === createdTab.id
            ) {
              chrome.tabs.onUpdated.removeListener(onUpdated);
              if (newTab.url === requestUrl) {
                console.log("RequestUrl has been loaded.", newTab, changeInfo);
                resolve(newTab);
              } else {
                console.log("Didn't reach requestUrl.");
                resolve(false);
              }
            }
          });
        });
      } else {
        chrome.tabs.update({ url: requestUrl }, () => {
          chrome.tabs.onUpdated.addListener(function onUpdated(
            newTabId,
            changeInfo,
            newTab
          ) {
            // Make sure the correct url has been loaded
            if (
              newTab.status === "complete" &&
              changeInfo.status === "complete" &&
              newTabId === tab.id
            ) {
              chrome.tabs.onUpdated.removeListener(onUpdated);
              if (newTab.url === requestUrl) {
                console.log("RequestUrl has been loaded.", newTab, changeInfo);
                resolve(newTab);
              } else {
                console.log("Didn't reach requestUrl.");
                resolve(false);
              }
            }
          });
        });
      }
    }
  });
}

chrome.runtime.onMessage.addListener(async (message) => {
  console.log("Message received in background!", message);

  if (message.action) {
    let [tab, connector, hostname] = await getConnector(message);
    if (connector && tab) {
      console.log(`Found matching ${connector.name} connector.`, connector);
      const { action } = message;
      if (connector.requestUrl) {
        tab = await loadUrl(tab, connector.requestUrl, message.create)
      }
      if (!tab) {
        chrome.runtime.sendMessage({
          actionResponse:
            "Couldn't load the request page, probably, you need to login first.",
        });
      } else {
        console.log(`Send Message to content script to execute ${action}`);
        chrome.tabs.sendMessage(<number>tab.id, { action: action });
      }
    } else {
      console.log(`Could not find connector matching ${tab.url}.`);
    }

  } else if (message.getActions) {
    const [tab, connector, hostname] = await getConnector(message);
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