/*
 * Public API Surface of fingerprintjs-pro-angular
 */

export * from './lib/fingerprintjs-pro-angular.service'
export * from './lib/fingerprintjs-pro-angular.module'
export * from './lib/interfaces/i-fingerprintjs-pro-settings'

export {
  CacheLocation,
  Cacheable,
  ICache,
  LocalStorageCache,
  SessionStorageCache,
  InMemoryCache,
  GetOptions,
  LoadOptions,
  GetResult,
  ExtendedGetResult,
  defaultEndpoint,
  defaultScriptUrlPattern,
  defaultTlsEndpoint,
  FpjsClientOptions,
  FingerprintJSPro,
} from '@fingerprintjs/fingerprintjs-pro-spa'
