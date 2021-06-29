import * as Utils from '../connectorUtils';

export const name = 'microsoft';
export const hostname = 'microsoft.com';
export const requestUrl = 'https://account.microsoft.com/privacy/download-data';
export const actions = ['request'];
export const description = "To download data from apps like OneDrive and Microsoft Teams, seperate requests must be send.";

export const request = async() => {
    (await Utils.waitForElement("button[data-bi-id='privacy.download-your-data.create-archive']"))?.click();
    (await Utils.waitForElements("i[data-icon-name='CheckMark']")).forEach((el: any) => el.click());
    (await Utils.waitForElement("button[data-bi-id='privacy.download-your-data.dialog.create-archive']"))?.click();

    Utils.sendSuccess();
};