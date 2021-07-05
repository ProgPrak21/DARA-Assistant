import * as Utils from '../connectorUtils';

export const name = 'google';
export const hostnames = ['www.google.com'];
export const requestUrl = 'https://takeout.google.com/';
export const actions = ['request'];
export const description = "";

export const request = async() => {
    Utils.pause(500);
    (await Utils.waitForElements("c-wiz > div > div > div > div > button"))[0]?.click();
    console.log('Clicked', (await Utils.waitForElements("c-wiz > div > div > div > div > button"))[0] )
    Utils.pause(200);
    (await Utils.waitForElements("c-wiz > div > div > div > div > button"))[1]?.click();
    Utils.pause(200);
    Utils.sendSuccess();
};