function injectFunction(tabId: number, functionName: Function) {
  const funString = functionName.toString();
  const funBody = funString.slice(funString.indexOf("{") + 1, funString.lastIndexOf("}"));
  chrome.tabs.executeScript(tabId, {
    code: funBody,
  });
}

console.log("Hello from background script!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background!", message);
  if (['request', 'check', 'download'].includes(message.type)) {
    // Listen for tabs update
    chrome.tabs.onUpdated.addListener(async function onUpdated(tabId, changeInfo, tab) {
      //check if the tab has been loaded
      if (changeInfo.status === "complete" && tabId === message.id) {
        console.log("Our tab has been loaded.");

        const { host } = new URL(tab.url ?? "");
        const { type } = message;
        const connector = await import(`./connectors/${host}.ts`);

        console.log(`Injecting ${type} script`);
        injectFunction(tabId, connector[type]);

        chrome.tabs.onUpdated.removeListener(onUpdated);
      }
    });
  }
});