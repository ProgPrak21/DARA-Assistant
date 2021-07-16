import * as Utils from '../connectorUtils';

export const name = 'spotify';
export const hostnames = ['www.spotify.com'];
export const requestUrl = 'https://www.spotify.com/us/account/privacy/';
export const actions = ['request'];
export const description = "Spotify does a bot check which requires user interaction.";

export const request = async() => {
    let btn1 = await Utils.observeQuerySelector('button[data-testid="download-step-1-button"]');
    let btn2 = await Utils.observeQuerySelector('button[data-testid="resend-confirmation-email"]');

    if (btn1) {
        btn1?.click();
        Utils.sendSuccess();
    } else if(btn2) {
        Utils.sendPending();
    }
};