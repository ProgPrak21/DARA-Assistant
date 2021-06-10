export * as facebook from './facebook'
export * as amazon from './amazon'


export type connector = {
    name: string;
    hostname: string;
    requestUrl: string;
    actions: Array<string>;
    check: Function;
    request: Function;
    download: Function;
};
