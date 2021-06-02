// This file is ran as a background script
console.log("Hello from background script!");

let services = ["facebook"];

// Listener for the messages from extension ()
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in background.js!", request);

  // Listen for tabs update
  chrome.tabs.onUpdated.addListener(function onUpdated(tabId, changeInfo, tab) {
    //check if the tab has been loaded
    if (tab.status === "complete") {
      console.log("The new tab has been loaded");

      // check for which service, type of request
      const { host } = new URL(tab.url ?? "");
      const { type } = request;
      console.log(host);
      //send request to content script
      console.log("Sending Request to content script");
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.id === tabId) {
            console.log("Tab Status ===> ", tab.status);
            chrome.tabs.sendMessage(tab.id, { host, type });
          }
        });
      });
      chrome.tabs.onUpdated.removeListener(onUpdated);
    }
  });
});
