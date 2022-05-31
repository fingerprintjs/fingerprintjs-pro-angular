/*
 * Public API Surface of fingerprintjs-pro-angular
 */

export * from './lib/fingerprintjs-pro-angular.service';
export * from './lib/fingerprintjs-pro-angular.module';
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
} from '@fingerprintjs/fingerprintjs-pro-spa';
