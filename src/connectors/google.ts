export const name = 'google';
export const hostname = 'google.com';
export const requestUrl = 'https://takeout.google.com/';
export const actions = ['request'];

export const request = async() => {

    const simulateClick = function(element:HTMLElement) {
        element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
        element.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window }))
    }

    const b1 = document.querySelector<HTMLElement>("button[data-disable-idom='true'][aria-label]");
    const b2 = document.querySelector<HTMLElement>("button[data-disable-idom='true'][contextmenu]");
    
    if (b1) simulateClick(b1);
    if (b2) simulateClick(b2);

    
    chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};

export const download = async () => {
    
    chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};
