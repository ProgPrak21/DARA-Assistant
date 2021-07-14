import * as Con from './connectors/.';
import type { DaraConnector as Connector } from './connectors/.';

export async function getCurrentTab() {
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

export function getStorageLocalData(key: string): Promise<Array<Connector> | chrome.runtime.LastError> {
  // Immediately return a promise and start asynchronous work
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.local.get([key], (result) => {
      if (chrome.runtime.lastError)
        reject(chrome.runtime.lastError);

      // Pass the data retrieved from storage down the promise chain.
      result = result[key] ?? [];
      resolve(result);
    });
  });
}

/**
 * Merges two arrays. The elements from arr1 
 * which have an equivalent prop with arr2 are 
 * replaced in the resulting array.
 * @param {Array<any>} arr1 Get replaced.
 * @param {Array<any>} arr2 Is preserved.
 * @param {string} prop The property used for replacement.
 * @returns {Array<any>} A merged array.
 */
export const merge = (arr1: Array<any>, arr2: Array<any>, prop: string): Array<any> =>
  arr1.filter(
    elArr1 => !arr2.find(
      elArr2 => elArr1[prop].toUpperCase() === elArr2[prop].toUpperCase()
    )
  ).concat(arr2).sort((a, b) => a.name.localeCompare(b.name));

/**
 * Finds a connector with matching hostname.
 * @param {string} hostname The hostname used to find the connector.
 * @returns {Promise<Connector | undefined>} connector.
 */
export async function getConnector(hostname: string): Promise<Connector | undefined> {
  const connectorsDara = Object.values(Con);
  const jgmdConnectors: any = await getStorageLocalData("jgmdConnectors");

  const connectors = merge(jgmdConnectors, connectorsDara, "name");
  console.log("Merged connectors:", connectors);
  const connector = connectors.find((connector) =>
    connector.hostnames.find((hostnameCon: string) => hostnameCon === hostname)
  );
  console.log("Found connector:", connector);
  return connector;
}

/**
 * Updates tab to requestUrl, or if create is true, 
 * create a new tab pointing to requestUrl.
 * @param {chrome.tabs.Tab} tab 
 * @param {string} requestUrl 
 * @param {boolean} create 
 * @returns {Promise<chrome.tabs.Tab | false>} Promise
 */
export async function loadUrl(tab: chrome.tabs.Tab, requestUrl: string, create: boolean): Promise<chrome.tabs.Tab | false> {
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

export async function injectContentScript(tabId: number) {
  return new Promise(resolve => {
    chrome.tabs.executeScript(
      tabId,
      { file: 'content.js' },
      () => {
        resolve(true);
      })
  });
}