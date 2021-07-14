import * as Utils from '../connectorUtils';

export const name = 'amazon.de';
export const hostnames = ['www.amazon.de'];
export const requestUrl = 'https://www.amazon.de/gp/privacycentral/dsar/preview.html';
export const actions = ['request'];
export const description = "";

export const request = async () => {
  await Utils.pause(200);
  (await Utils.waitForElement("span.a-button-text,a-declarative[id='a-autoid-0-announce']"))?.click();
  await Utils.pause(200);
  (await Utils.waitForElement("a[id='aedu-dsar-data-categories-dropdown_15']"))?.click();
  await Utils.pause(200);
  (await Utils.waitForElement("input.a-button-input[aria-labelledby='aedu-dsar-create-btn-announce']"))?.click();
  Utils.sendSuccess();
};