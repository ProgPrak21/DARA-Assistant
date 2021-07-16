import * as Utils from '../connectorUtils';

export const name = 'google';
export const hostnames = ['www.google.com', 'takeout.google.com','www.google.de'];
export const requestUrl = 'https://takeout.google.com/';
export const actions = ['request'];
export const description = "";

export const request = async() => {
    Utils.pause(500);
    (await Utils.observeQuerySelectorAll("c-wiz > div > div > div > div > button"))[0]?.click();
    console.log('Clicked', (await Utils.observeQuerySelectorAll("c-wiz > div > div > div > div > button"))[0] )
    Utils.pause(200);
    (await Utils.observeQuerySelectorAll("c-wiz > div > div > div > div > button"))[1]?.click();
    Utils.pause(200);
    Utils.sendMessageSuccess();
};