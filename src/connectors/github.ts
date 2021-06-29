import * as Utils from '../connectorUtils';

export const name = 'github';
export const hostname = 'github.com';
export const requestUrl = 'https://github.com/settings/admin';
export const actions = ['request'];
export const description = "";


export const request = async () => {

    /*
    // Unfortunately using the github api requires separate authentication.
    const url = 'https://api.github.com/user/migrations';
    const params = {
        method: 'POST',
        headers: { "Accept": "application/vnd.github.v3+json" },
        body: JSON.stringify({ "repositories": ["repositories"] })
    }
    const response = await fetch(url, <any>params).then(response => response.json());
    console.log('Response:', response);
    if (response.status === 201) {
        chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
    }
    */

    const btn = await Utils.waitForElement("form>input.btn[type='submit']")
    if (btn?.hasAttribute('disabled')){
        Utils.sendPending();
    } else {
        btn?.click();
        Utils.sendSuccess();
    }
};