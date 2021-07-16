import * as Utils from '../connectorUtils';

/** name (required)
 * Is just the name used for referencing the connector, 
 * it is displayed in the company overview page.
 */
export const name = '';

/** hostnames (required)
 * Is an array of all the hostnames of the company, 
 * you want this connector to be used for. 
 * For eBay this could be ['www.ebay.com','www.ebay.de', ...]. 
 * Be sure to include the full subdomain.
 */
export const hostnames = [''];

/** requestUrl (required)
 * This is the URL of the company's website, 
 * where one can submit a data access request.
 */
export const requestUrl = '';

/** actions (can be empty)
 * An array of the available actions implemented in the connector. 
 * An action is a sequence of clicks to perform a certain interaction with the page. 
 * In most cases, actions will just include 'request'.
 */
export const actions = ['request'];

/** description (can be empty)
 * A string describing the available actions. Or, 
 * if no action available, how to request one's data manually.
 */
export const description = '';

/** Action function (must be named exactly like in 'actions')
 * JavaScript code to be executed on the website specified 
 * via requestUrl. Some helper functions have been imported 
 * from connectorUtils.ts, maybe they are useful to you. 
 * When the code has successfully executed, 
 * you can end the function with Utils.sendSuccess();, 
 * informing the user about the completed injection.
 */
export const request = async () => {
    (await Utils.observeQuerySelector(''))?.click();
    Utils.sendSuccess();
};