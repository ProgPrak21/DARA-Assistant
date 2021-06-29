import * as Utils from '../connectorUtils';

export const name = '';
export const hostname = '';
export const requestUrl = '';
export const actions = [''];
export const description = "";

export const request = async() => {
    (await Utils.waitForElement(""))?.click();
    Utils.sendSuccess();
};