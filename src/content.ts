import * as Utils from './pageUtils';

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log("Received message in content script.", message)
  if (message.action) {
    const { hostname } = new URL(window.location.href ?? "");
    const connector = await Utils.getConnector(hostname);
    (<any>connector)[message.action]();
  }
});