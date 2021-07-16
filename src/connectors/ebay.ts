import * as Utils from '../connectorUtils';

export const name = 'ebay';
export const hostnames = ['www.ebay.com','www.sarweb.ebay.com','www.ebay.de'];
export const requestUrl = 'https://www.sarweb.ebay.com/sar';
export const actions = ['request'];
export const description = "";

export const request = async () => {

    const reportStatus = document.querySelector<HTMLElement>(".reportStatus");
    const b = document.querySelector<HTMLElement>("button.itCreateNewReportBtn[aria-label='Create new report']");
    if (reportStatus?.innerText === 'Processing') {
        console.log("Still processing.")
        chrome.runtime.sendMessage({ actionResponse: "Your last data request is still pending." });
    } else if(b) {
        b?.click();
        (await Utils.observeQuerySelector("button.itSarSubmit,btn[type='button'][aria-describedby='selectReportValidationTxt']"))?.click();
        chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
    } else {
        (await Utils.observeQuerySelector("button.itSarSubmit,btn[type='button'][aria-describedby='selectReportValidationTxt']"))?.click();
        chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
    }

};