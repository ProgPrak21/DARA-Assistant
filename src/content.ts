import * as con from './connectors/.';

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log("Received message in content script.", message)
    if (message.action) {
        const { hostname } = new URL(window.location.href ?? "");
        const connectors = Object.values(con);
        const connector = connectors.find(connector => hostname.includes(connector.hostname));
        (<any>connector)[message.action]();
    }
});