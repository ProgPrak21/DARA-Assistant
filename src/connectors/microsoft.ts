import * as Utils from '../connectorUtils';

export const name = 'microsoft';
export const hostnames = ['www.microsoft.com','account.microsoft.com'];
export const requestUrl = 'https://account.microsoft.com/privacy/download-data';
export const actions = ['request'];
export const description = "To download data from apps like OneDrive and Microsoft Teams, seperate requests must be send.";

export const request = async() => {
    (await Utils.observeQuerySelector("button[data-bi-id='privacy.download-your-data.create-archive']"))?.click();
    (await Utils.observeQuerySelectorAll("i[data-icon-name='CheckMark']")).forEach((el: any) => el.click());
    (await Utils.observeQuerySelector("button[data-bi-id='privacy.download-your-data.dialog.create-archive']"))?.click();

    Utils.sendSuccess();
};