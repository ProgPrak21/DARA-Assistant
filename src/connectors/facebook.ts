import * as Utils from '../connectorUtils';

export const name = 'facebook';
export const hostname = 'facebook.com';
export const requestUrl = 'https://www.facebook.com/dyi/?referrer=yfi_settings';
export const actions = ['request', 'download']
export const description = "Facebook allows us to download a data archive after creating it, which can take a while.";

/**
 * Just a Note
 **

export const requestNew = async () => {
  
  (await Utils.waitForElements("div[aria-disabled='false']"))[1]?.click();
  (await Utils.waitForElements("div span"))?.find(
    (e: { textContent: string; }) => e.textContent === "JSON"
  )?.click();

  (await Utils.waitForElement("div span div div"))?.click();
  (await Utils.waitForElement("input[value='all_time']"))?.click();
  (await Utils.waitForElements("div span div div"))?.find(
    (e: { textContent: string; }) => e.textContent === "Update"
  )?.click();

  Utils.sendSuccess();
};
*/

export const request = () => {

  const execRequest = async (iframe:any) => {
    console.log("Executing Facebook Request!");
    // Open the Format drawer and select "JSON" 
    (<HTMLElement>Array.from(iframe.contentWindow.document.body.querySelectorAll("div[aria-disabled='false']"))[1])?.click();
    await Utils.pause(500);
    (<HTMLElement>Array.from(iframe.contentWindow.document.body.querySelectorAll("div span"))?.find(
      (e: any) => e.textContent === "JSON"
    ))?.click();

    // Open the Date range and select "All time"
    (<HTMLElement>iframe.contentWindow.document.body.querySelectorAll("div[role='button']")[0])?.click();
    await Utils.pause(500);
    (<HTMLElement>iframe.contentWindow.document.body.querySelector("input[value='all_time']"))?.click();
    (<HTMLElement>Array.from(iframe.contentWindow.document.body.querySelectorAll("div span div div"))?.find(
      (e: any) => e.textContent === "Update"
    ))?.click();

    // Click on Create File button
    (<HTMLElement>iframe.contentWindow.document.body.querySelectorAll("button[aria-disabled]")[0])?.click?.();
    Utils.sendSuccess();
  }

  Utils.execInIframe(execRequest);
};

export const download = () => {

  const execDownload = (iframe:any) => {
    console.log("Executing Facebook Download!");
    const pending: any =
      Array.from(
        iframe.contentWindow.document.body.querySelectorAll('div[role="heading"]')
      ).find((e: any) =>
        e.textContent?.startsWith("A copy of your information is being created.")
      )

    const downloadBtn: any =
      Array.from(
        iframe.contentWindow.document.body.querySelectorAll('div[data-hover="tooltip"]')
      )?.find((e: any) => e?.textContent?.startsWith("Download"));

    if (downloadBtn !== undefined) {
      downloadBtn.click();
      Utils.send("Your data request is ready to download.");
    } else if (!pending === undefined) {
      Utils.sendPending();
    }
  }

  Utils.execInIframe(execDownload);
};