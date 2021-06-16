export const name = 'linkedin';
export const hostname = 'linkedin.com';
export const requestUrl = 'https://www.linkedin.com/psettings/data-privacy';
export const actions = ['request'];

export const request = async () => {
    const pause = (time: number) =>
        new Promise(
            (resolve) => setTimeout(resolve, time)
        );

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
    const state = document.querySelector<HTMLElement>("span.state[data-state-key='i18n_member_data_state_choice']");
    if (state?.innerText.includes('Download pending')) {
        chrome.runtime.sendMessage({ actionResponse: "Your last data request is still pending." });
    } else {
        (await waitForElement("a[aria-controls='setting-member-data-content']"))?.click();
        (await waitForElement("input[id='fast-file-only-plus-other-data']"))?.click();
        (await waitForElement("button.request-archive-btn,single-file-take-out-btn[id='download-button]"))?.click();
        chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
    }
};

export const download = async () => {
    chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};
