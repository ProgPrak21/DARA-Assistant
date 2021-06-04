function injectFunction(tabId: number, functionName: Function) {
  const funString = functionName.toString();
  const funBody = funString.slice(funString.indexOf("{") + 1, funString.lastIndexOf("}"));
  chrome.tabs.executeScript(tabId, {
    code: funBody,
  });
}

async function connectorExists(serviceName: string) {
  const connector = await import(`./connectors/${serviceName}.ts`).catch(function () { return false });
  return connector;
}

console.log("Hello from background script!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background!", message);
  if (['request', 'check', 'download'].includes(message.type)) {
    // Listen for tabs update
    chrome.tabs.onUpdated.addListener(async function onUpdated(tabId, changeInfo, tab) {
      //check if the tab has been loaded
      console.log("Received onUpdated event.", tab, changeInfo);
      if (tab.status === "complete" && changeInfo.status === "complete" && tabId === message.id) {
        console.log("Our tab has been loaded.", tab, changeInfo);

        const { hostname } = new URL(tab.url ?? "");
        const hostNameSplited = hostname.split(".");
        let part: string;
        let connector: any;
        
        for (part of hostNameSplited) {
          connector = await connectorExists(part);
          if (connector !== false) {
            console.log(`Found matching ${part} connector.`)
            const { type } = message;

            console.log(`Injecting ${type} script`);
            injectFunction(tabId, connector[type]);
            break;
          }
        }
        if (connector === false) {
          console.log('Could not find connector for the requested domain.')
        }

        chrome.tabs.onUpdated.removeListener(onUpdated);
      }
    });
  }
});