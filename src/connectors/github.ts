import * as Utils from '../connectorUtils';

export const name = 'github';
export const hostname = 'github.com';
export const requestUrl = 'https://github.com/settings/admin';
export const actions = ['request'];

export const request = async () => {

    /*
    // Unfortunately this requires separate authentication.
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

    const btn = await Utils.waitForElement("form>input.btn.btn-sm[type='submit']")
    if (btn?.hasAttribute('disabled')){
        chrome.runtime.sendMessage({ actionResponse: "Your request is still pending." });
    } else {
        btn?.click();
        chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
    }
};


export const download = async () => {
    chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};
