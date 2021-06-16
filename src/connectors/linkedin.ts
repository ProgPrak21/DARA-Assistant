export const name = 'linkedIn';
export const hostname = 'linkedin.com';
export const requestUrl = '';
export const actions = [''];

export const request = async() => {
    chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};

export const download = async () => {
    chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};
