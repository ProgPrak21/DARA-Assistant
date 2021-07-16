import * as Utils from '../connectorUtils';

export const name = 'reddit';
export const hostnames = ['www.reddit.com'];
export const requestUrl = 'https://www.reddit.com/settings/data-request';
export const actions = ['request'];
export const description = "";

export const request = async () => {

    const btn: any = await Utils.observeQuerySelector("fieldset button[role='button']");
    if (!btn?.hasAttribute('disabled')) {
        // Select GDPR
        // (await Utils.observeQuerySelector("form fieldset input[type='hidden']"))?.setAttribute('value', 'GDPR');
        (await Utils.observeQuerySelector("fieldset div[aria-label='privacyLaws'] div[aria-checked]"))?.click();

        // Select full time frame
        (await Utils.observeQuerySelectorAll("fieldset div[aria-label='exportRange'] div[role='radio']"))[1]?.click();
        
        // Issue request
        //(<any>(await Utils.observeQuerySelector("form")))?.submit();
        btn.click();
        
        Utils.sendMessageSuccess();
    } else {
        Utils.sendMessagePending();
    }
};