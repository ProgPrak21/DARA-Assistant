function injectFunction(tabId: number, functionName: Function) {
  const funString = functionName.toString();
  const funBody = funString.slice(funString.indexOf("{") + 1, funString.lastIndexOf("}"));
  chrome.tabs.executeScript(tabId, {
    code: funBody,
  });
}

// This file is ran as a background script
console.log("Hello from background script!");

// Listener for the messages from extension ()
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background!", message);
  if (['request', 'check', 'download'].includes(message.type)) {
    // Listen for tabs update
    chrome.tabs.onUpdated.addListener(async function onUpdated(tabId, changeInfo, tab) {
      //check if the tab has been loaded
      if (changeInfo.status === "complete" && tabId === message.id) {
        console.log("The new tab has been loaded");

        // check for which service, type of message
        const { host } = new URL(tab.url ?? "");
        const { type } = message;
        console.log(host);
        const connector = await import(`./connectors/${host}.ts`);  

        if (host === "www.facebook.com") {
          if (type === "request") {
            console.log("Injecting request script");
            injectFunction(tabId, connector.request);
          }

          if (type === "check") {
            console.log("Injecting check script");
            injectFunction(tabId, connector.check);
          }

          if (type === "download") {
            console.log("Injecting download script");
            injectFunction(tabId, connector.download);
          }
        }
        chrome.tabs.onUpdated.removeListener(onUpdated);
      }
    });
  }
});