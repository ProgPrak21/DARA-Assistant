import * as Utils from "./pageUtils";

const setupJgmdConnectors = async () => {

  const jgmdConnectors: any = await Utils.getStorageLocalData("jgmdConnectors");

  if (Array.isArray(jgmdConnectors) && !jgmdConnectors.length) {
    const url = "https://raw.githubusercontent.com/justgetmydata/jgmd/master/_data/sites.json"

    let response = await fetch(url).then(responseRaw => responseRaw.json())

    response.forEach((element: any) => {
      element.description = element.notes_en;
      element.requestUrl = element.url;
      element.hostnames = [(new URL(element.url ?? "")).hostname]
      element.actions = [];
    });

    chrome.storage.local.set({ jgmdConnectors: response }, function () {
      console.log('Stored connectors in local storage:', response);
    });
  }
}

chrome.runtime.onStartup.addListener(() => {
  setupJgmdConnectors();
});

chrome.runtime.onInstalled.addListener(() => {
  setupJgmdConnectors();
});

const handleAction = async (message: any) => {
  let tab: any = await Utils.getCurrentTab();
  const hostname = message.hostname ?? (new URL(tab.url ?? "")).hostname;
  const connector: any = await Utils.getConnector(hostname);
  if (connector && tab) {
    const { action } = message;
    if (connector.requestUrl) {
      tab = await Utils.loadUrl(tab, connector.requestUrl, message.create)
    }
    if (tab === false) {
      chrome.runtime.sendMessage({
        actionResponse:
          "Didn't reach the company's request page. Probably, you need to log in first.",
      });
    } else {
      await Utils.injectContentScript(tab.id);
      console.log(`Send Message to content script to execute ${action}`);
      chrome.tabs.sendMessage(<number>tab.id, { action: action });
    }
  } else {
    console.log(`Could not find connector matching ${tab.url}.`);
  }
}

const handleGetConnector = async () => {
  const tab: any = await Utils.getCurrentTab();
  const { hostname } = new URL(tab.url ?? "");
  const connector: any = await Utils.getConnector(hostname);
  if (connector && tab) {
    console.log("Sending response:", { connector: connector });
    chrome.runtime.sendMessage({
      connector: {
        name: connector.name,
        description: connector.description,
        requestUrl: connector.requestUrl,
        actions: connector.actions,
      }
    });
  } else {
    console.log(`Could not find connector matching ${tab.url}.`);
    chrome.runtime.sendMessage({ notSupported: true });
  }
}

const handleDownload = async (message: any) => {
  chrome.downloads.download({
    url: message.downloadUrl,
    filename: message.downloadName,
  });
  chrome.runtime.sendMessage({ actionResponse: "Your Download is ready." });
}

chrome.runtime.onMessage.addListener(async (message) => {
  console.log("Message received in background!", message);
  if (message.action) {
    handleAction(message);
  } else if (message.getConnector) {
    handleGetConnector();
  } else if (message.download) {
    handleDownload(message);
  }
});