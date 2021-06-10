export * as facebook from './facebook'
export * as instagram from './instagram'


export type connector = {
    name: string;
    hostname: string;
    requestUrl: string;
    actions: Array<string>;
    check: Function;
    request: Function;
    download: Function;
};
