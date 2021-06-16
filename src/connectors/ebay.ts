export const name = 'ebay';
export const hostname = 'ebay.com';
export const requestUrl = 'https://www.sarweb.ebay.com/sar';
export const actions = ['request'];

export const request = async () => {

    const waitForElement = (selector: string) => {
        return new Promise<HTMLElement | null>(function (resolve, reject) {
            let el = document.querySelector<HTMLElement>(selector);
            if (el) { resolve(el); }

            new MutationObserver((mutationRecords, observer) => {
                // Query for elements matching the specified selector
                const element = document.querySelector<HTMLElement>(selector);
                if (element) {
                    resolve(element);
                    //Once we have resolved we don't need the observer anymore.
                    observer.disconnect();
                }
            })
                .observe(document.documentElement, {
                    childList: true,
                    subtree: true
                });
        });
    }

    const reportStatus = document.querySelector<HTMLElement>(".reportStatus");
    const b = document.querySelector<HTMLElement>("button.itCreateNewReportBtn[aria-label='Create new report']");
    if (reportStatus?.innerText === 'Processing') {
        console.log("Still processing.")
        chrome.runtime.sendMessage({ actionResponse: "Your last data request is still pending." });
    } else if(b) {
        b?.click();
        (await waitForElement("button.itSarSubmit,btn[type='button'][aria-describedby='selectReportValidationTxt']"))?.click();
        chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
    } else {
        (await waitForElement("button.itSarSubmit,btn[type='button'][aria-describedby='selectReportValidationTxt']"))?.click();
        chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
    }

};

export const download = async () => {
    chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};
