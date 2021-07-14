import * as Utils from '../connectorUtils';

export const name = 'reddit';
export const hostnames = ['www.reddit.com'];
export const requestUrl = 'https://www.reddit.com/settings/data-request';
export const actions = ['request'];
export const description = "";

export const request = async () => {

    const btn: any = await Utils.waitForElement("fieldset button[role='button']");
    if (!btn?.hasAttribute('disabled')) {
        // Select GDPR
        // (await Utils.waitForElement("form fieldset input[type='hidden']"))?.setAttribute('value', 'GDPR');
        (await Utils.waitForElement("fieldset div[aria-label='privacyLaws'] div[aria-checked]"))?.click();

        // Select full time frame
        (await Utils.waitForElements("fieldset div[aria-label='exportRange'] div[role='radio']"))[1]?.click();
        
        // Issue request
        //(<any>(await Utils.waitForElement("form")))?.submit();
        btn.click();
        
        Utils.sendSuccess();
    } else {
        Utils.sendPending();
    }
};