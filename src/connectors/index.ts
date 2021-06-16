export * as facebook from './facebook'
export * as instagram from './instagram'
export * as amazon from './amazon'
export * as ebay from './ebay'


export type connector = {
    name: string;
    hostname: string;
    requestUrl: string;
    actions: Array<string>;
    request: Function;
    download: Function;
};
