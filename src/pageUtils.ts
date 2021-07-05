import * as Con from './connectors/.';

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

export function getStorageLocalData(key: string): Promise<{ connectors: Array<any> } | chrome.runtime.LastError> {
  // Immediately return a promise and start asynchronous work
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.local.get([key], (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(result);
    });
  });
}

export const merge = (arr1: Array<any>, arr2: Array<any>, prop: string) =>
  arr1.filter(
    elArr1 => !arr2.find(
      elArr2 => elArr1[prop].toUpperCase() === elArr2[prop].toUpperCase()
    )
  ).concat(arr2).sort((a, b) => a.name.localeCompare(b.name));

/**
 * Finds a connector with matching hostname.
 * @param {string} hostname 
 * @returns {Promise<object>} connector
 */
export async function getConnector(hostname: string): Promise<object> {
  const connectorsDara = Object.values(Con);
  const connectorsJgmd = (await getStorageLocalData("connectors") as any).connectors;

  const connectors = merge(connectorsJgmd, connectorsDara, "name");
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