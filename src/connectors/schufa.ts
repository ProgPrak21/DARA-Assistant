import * as Utils from '../connectorUtils';

export const name = 'schufa';
export const hostnames = ['www.meineschufa.de','www.schufa.de'];
export const requestUrl = 'https://www.meineschufa.de/index.php?site=11_3';
export const actions = ['request'];
export const description = "";

export const request = async() => {
    (await Utils.waitForElement("td.but02>a#dakoLink"))?.click();
    chrome.runtime.sendMessage({ actionResponse: "Please enter your data." });
};
