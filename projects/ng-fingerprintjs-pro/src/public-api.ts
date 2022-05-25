/*
 * Public API Surface of ng-fingerprintjs-pro
 */

export * from './lib/ng-fingerprintjs-pro.service';
export * from './lib/ng-fingerprintjs-pro.module';
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
  ExtendedGetResult
} from '@fingerprintjs/fingerprintjs-pro-spa';
