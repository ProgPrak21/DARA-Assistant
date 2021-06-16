import * as con from './connectors/.';
import type { connector } from './connectors/.';

chrome.runtime.onMessage.addListener(async (m) => {
    console.log("Received message:", m)
    const { hostname } = new URL(window.location.href ?? "");
    if (m.action) {
        let connectors: Array<connector> = [];
        for (let key of Object.keys(con)) {
            connectors.push((<any>con)[key]);
        }
        const connector = connectors.find(connector => hostname.includes(connector.hostname));
        (<any>connector)[m.action]();
    }
});