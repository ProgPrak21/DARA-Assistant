export * as amazon from './amazon'
export * as amazonDe from './amazon.de'
export * as apple from './apple'
export * as ebay from './ebay'
export * as facebook from './facebook'
export * as instagram from './instagram'
export * as linkedin from './linkedin'
export * as github from './github'
export * as schufa from './schufa'
export * as twitter from './twitter'
export * as reddit from './reddit'
export * as microsoft from './microsoft'
export * as google from './google'
export * as spotify from './spotify'
export * as tumblr from './tumblr'

export interface DaraConnector {
  name: string;
  hostname: string;
  requestUrl: string;
  actions: Array<string>;
  check?: Function;
  request?: Function;
  download?: Function;
};