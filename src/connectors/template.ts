import * as Utils from '../connectorUtils';

export const name = '';
export const hostname = '';
export const requestUrl = '';
export const actions = [''];
export const description = "";

export const request = async() => {
    chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};

export const download = async () => {
    chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};
