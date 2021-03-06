import * as Utils from '../connectorUtils';

export const name = 'apple';
export const hostnames = ['www.apple.com', 'privacy.apple.com'];
export const requestUrl = 'https://privacy.apple.com/account';
export const actions = ['request'];
export const description = "";

export const request = async() => {
    
    (await Utils.observeQuerySelector("div.idms-button>button.button.button-link"))?.click();
    (await Utils.observeQuerySelector("div.row.button-bar.top div.pull-right>button.button.button-secondary"))?.click();
    (await Utils.observeQuerySelector("div.row.button-bar.middle div.pull-right>button.button.button-secondary"))?.click();
    (await Utils.observeQuerySelector("div.row.button-bar.bottom button.button:not(.button-secondary)"))?.click();
    (await Utils.observeQuerySelector("div.primary-button-group button.button-primary[type='button']"))?.click();

    chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};