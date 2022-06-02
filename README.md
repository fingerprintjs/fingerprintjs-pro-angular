<p align="center">
  <a href="https://fingerprintjs.com">
    <img src="https://raw.githubusercontent.com/fingerprintjs/fingerprintjs-pro-angular/main/res/logo.svg" alt="FingerprintJS" width="312px" />
  </a>
<p align="center">
<a href="https://github.com/fingerprintjs/fingerprintjs-pro-angular/actions/workflows/ci.yml">
  <img src="https://github.com/fingerprintjs/fingerprintjs-pro-angular/actions/workflows/ci.yml/badge.svg" alt="CI badge" />
</a>
<a href="https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro-angular">
  <img src="https://img.shields.io/npm/v/@fingerprintjs/fingerprintjs-pro-angular.svg" alt="Current NPM version">
</a>
<a href="https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro-angular">
  <img src="https://img.shields.io/npm/dm/@fingerprintjs/fingerprintjs-pro-angular.svg" alt="Monthly downloads from NPM">
<a href="https://opensource.org/licenses/MIT">
  <img src="https://img.shields.io/:license-mit-blue.svg" alt="MIT license">
</a>
<a href="https://discord.gg/39EpE2neBg">
  <img src="https://img.shields.io/discord/852099967190433792?style=logo&label=Discord&logo=Discord&logoColor=white" alt="Discord server">
</a>


# FingerprintJS Pro Angular

FingerprintJS Pro Angular is an easy-to-use Angular library for **[FingerprintJS Pro](https://fingerprintjs.com/)**. An example usage is located in the [src](https://github.com/fingerprintjs/fingerprintjs-pro-react/tree/main/src) folder.  **This package works with FingerprintJS Pro, it is not compatible with [open-source FingerprintJS](https://github.com/fingerprintjs/fingerprintjs).** You can learn more about the difference between FingerprintJS Pro and open-source FingerprintJS in the [official documentation](https://dev.fingerprintjs.com/docs/pro-vs-open-source).

## Table of contents

- [Installation](#installation)
- [Getting started](#getting-started)
- [Caching strategy](#caching-strategy)
- [Documentation](#documentation)
- [Support and feedback](#support-and-feedback)
- [License](#license)

## Installation

Using [npm](https://npmjs.org):

```sh
npm install @fingerprintjs/fingerprintjs-pro-angular
```

Using [yarn](https://yarnpkg.com):

```sh
yarn add @fingerprintjs/fingerprintjs-pro-angular
```

## Getting started

To identify visitors, you'll need a FingerprintJS Pro account (you can [sign up for free](https://dashboard.fingerprintjs.com/signup/)).
You can learn more about API keys in the [official FingerprintJS Pro documentation](https://dev.fingerprintjs.com/docs/quick-start-guide).

1. Add `FingerprintjsProAngularModule.forRoot()` to the imports sections in your root application module and pass the `loadOptions` configuration object. Set up your public key in the `apiKey` option. Set a `region` if you have chosen a non-global region during registration. Please refer to the [Regions page](https://dev.fingerprintjs.com/docs/regions). More information about `.forRoot()` arguments you can [find below](#fingerprintjsproangularmoduleforroot-props).

```javascript
import { NgModule } from '@angular/core';
import { FingerprintjsProAngularModule } from 'fingerprintjs-pro-angular';
// ...

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FingerprintjsProAngularModule.forRoot({loadOptions: {apiKey: 'your-fpjs-public-api-key'}})
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

2. Inject service `FingerprintjsProAngularService` in your component's constructor. Now you can identify visitor using `getVisitorData()` method from the service.

```typescript
import { Component, OnInit } from '@angular/core';
import { FingerprintjsProAngularService } from 'fingerprintjs-pro-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fingerprintjsProAngularService: FingerprintjsProAngularService) { }
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  visitorId = 'Press "Identify" button to get visitorId';

  async onIdentifyButtonClick() : Promise<void> {
    const data = await this.fingerprintjsProAngularService.getVisitorData();
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    this.visitorId = data.visitorId;
    this.extendedResult = data;
  }
}
```

## Caching strategy
:warning: **WARNING** If you use data from `extendedResult`, please pay additional attention to caching strategy.

FingerprintJS Pro uses API calls as the basis for billing. Our [best practices](https://dev.fingerprintjs.com/docs/caching-visitor-information) strongly recommend using cache to optimise API calls rate. The Library uses the SessionStorage cache strategy by default.

Some fields from the [extendedResult](https://dev.fingerprintjs.com/docs/js-agent#extendedresult) (e.g `ip` or `lastSeenAt`) might change for the same visitor. If you need exact current data, it is recommended to pass `ignoreCache=true` inside [getVisitorData](#getvisitordatagetoptions-getoptions) function.

## Documentation

This library uses [FingerprintJS Pro agent](https://fingerprintjs.com/github/) internally. The documentation for the FingerprintJS Pro agent is available at https://dev.fingerprintjs.com/docs.

### `FingerprintjsProAngularModule`

The module just initializes the FingerprintJS Pro agent with load options, configure caching strategy, and provides `FingerprintjsProAngularService` to DI.

#### `FingerprintjsProAngularModule.forRoot` props

`loadOptions: FingerprintJS.LoadOptions`

Options for the FingerprintJS JS Pro agent `load()` method. Options follow the [agent's initialisation properties](https://dev.fingerprintjs.com/docs/js-agent#agent-initialization).

`cacheLocation?: CacheLocation`

Defines which built-in cache mechanism the client should use. Caching options follow properties defined in the [fingerprintjs-pro-spa repository](https://github.com/fingerprintjs/fingerprintjs-pro-spa#caching).

`cache?: ICache`

Custom cache implementation. Takes precedence over the `cacheLocation` property. Caching options follow properties defined in the [fingerprintjs-pro-spa repository](https://github.com/fingerprintjs/fingerprintjs-pro-spa#caching).

`cacheTimeInSeconds?: number`

Duration in seconds for which data is stored in the cache. Cannot exceed 86_400 (24h) because caching data for longer than 24 hours can negatively affect identification accuracy. Caching options follow properties defined in the [fingerprintjs-pro-spa repository](https://github.com/fingerprintjs/fingerprintjs-pro-spa#caching).

`cachePrefix?: string`

Custom prefix for localStorage and sessionStorage cache keys. Will be ignored if the `cache` is provided. Caching options follow properties defined in the [fingerprintjs-pro-spa repository](https://github.com/fingerprintjs/fingerprintjs-pro-spa#caching).

### `FingerprintjsProAngularService` methods

#### `getVisitorData(ignoreCache?: boolean, options?: GetOptions<TExtended>)`

This method performs identification requests with the FingerprintJS Pro API. The returned object contains information about loading status, errors, and [visitor](https://dev.fingerprintjs.com/docs/js-agent#extendedresult).

- `getOptions: GetOptions<TExtended>` parameter follows parameters of the FingerprintJS Pro's [`get` function](https://dev.fingerprintjs.com/docs/js-agent#parameters-reference).
- `ignoreCache: boolean` always make a request to the API, even if the data is present in the cache.

#### `clearCache`

Method clears the cache for current caching strategy. 

## Support and feedback
For support or to provide feedback, please [raise an issue on our issue tracker](https://github.com/fingerprintjs/fingerprintjs-pro-angular/issues). If you require private support, please email us at oss-support@fingerprintjs.com. If you'd like to have a similar Angular library for the [open-source FingerprintJS](https://github.com/fingerprintjs/fingerprintjs), consider [raising an issue in our issue tracker](https://github.com/fingerprintjs/fingerprintjs-pro-angular/issues).


## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/fingerprintjs/fingerprintjs-pro-angular/blob/main/LICENSE) file for more info.
