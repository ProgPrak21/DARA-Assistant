import * as Utils from '../connectorUtils';

export const name = 'twitter';
export const hostname = 'twitter.com';
export const requestUrl = 'https://twitter.com/settings/your_twitter_data/request_data';
export const actions = ['request'];
export const description = "";

export const request = async() => {
    (await Utils.waitForElement("section[aria-labelledby='detail-header']>div>div>div[role='button'][tabindex='0']"))?.click();
    Utils.sendSuccess();
};