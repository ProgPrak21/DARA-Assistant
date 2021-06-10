export const name = 'amazon';
export const hostname = 'amazon.com';
export const requestUrl = 'https://www.amazon.com/gp/privacycentral/dsar/preview.html';
export const actions = ['request'];

export const request = async() => {
    const pause = (time: number) =>
    new Promise(
      (resolve) => setTimeout(resolve, time)
    );

    // Todo find a better way
    await pause(200);
    document.querySelector<HTMLElement>("span.a-button-text,a-declarative[id='a-autoid-0-announce']")?.click();
    await pause(500);
    document.getElementById('aedu-dsar-data-categories-dropdown_15')?.click();
    await pause(500);
    document.querySelector<HTMLElement>("input.a-button-input[aria-labelledby='aedu-dsar-create-btn-announce']")?.click();
    chrome.runtime.sendMessage({ actionResponse: "You requested your data." });
};

export const download = async () => {
    // afaik not possible
};
