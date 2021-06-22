import * as Utils from '../connectorUtils';

export const name = 'reddit';
export const hostname = 'reddit.com';
export const requestUrl = 'https://www.reddit.com/settings/data-request';
export const actions = ['request'];

// WIP
export const request = async () => {

    const btn = await Utils.waitForElement("fieldset button[role='button']");
    if (!btn?.hasAttribute('disabled')) {
        // Select GDPR
        (await Utils.waitForElement("form fieldset input[type='hidden']"))?.setAttribute('value', 'GDPR');
        
        // Select full time frame
        //(await Utils.waitForElement("div[aria-label='brivacyLaws'] div[aria-checked]"))?.click();
        //(await Utils.waitForElement("form fieldset input[type='hidden']"))?.setAttribute('value', 'GDPR');
        
        // Issue request
        (<any>(await Utils.waitForElement("form")))?.submit();
        // or btn.click();
        Utils.sendSuccess();
    } else {
        Utils.sendPending();
    }
};