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

function getStorageLocalData(key: string) {
  // Immediately return a promise and start asynchronous work
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.local.get([key], (result) => {
      // Pass any observed errors down the promise chain.
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(result);
    });
  });
}

const merge = (arr1: Array<any>, arr2: Array<any>, prop: string) =>
  arr1.filter(
    elArr1 => !arr2.find(
      elArr2 => elArr1[prop].toUpperCase() === elArr2[prop].toUpperCase()
    )
  ).concat(arr2).sort((a, b) => a.name.localeCompare(b.name));

export async function getConnector(hostname: string): Promise<
  [any, any, string]
> {
  const connectorsDara: any = Object.values(Con);
  const connectorsJgmd: any = (<any>await getStorageLocalData("connectors")).connectors;
  const connectors = merge(connectorsJgmd, connectorsDara, "name");
  console.log("Merged connectors:", connectors);
  
  const connector = connectors.find((connector: any) =>
    connector.hostnames.find((hostnameCon: any) => hostnameCon === hostname)
  );
  console.log("Found connector:", connector);
  return connector;
}
