import * as Utils from '../connectorUtils';

export const name = 'linkedin';
export const hostname = 'linkedin.com';
export const requestUrl = 'https://www.linkedin.com/psettings/data-privacy';
export const actions = ['request'];
export const description = "";


export const request = async () => {
    const state = document.querySelector<HTMLElement>("span.state[data-state-key='i18n_member_data_state_choice']");
    if (state?.innerText.includes('Download pending')) {
        chrome.runtime.sendMessage({ actionResponse: "Your last data request is still pending." });
    } else {
        (await Utils.waitForElement("a[aria-controls='setting-member-data-content']"))?.click();
        (await Utils.waitForElement("input[id='fast-file-only-plus-other-data']"))?.click();
        (await Utils.waitForElement("button.request-archive-btn,single-file-take-out-btn[id='download-button]"))?.click();
        chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
    }
};