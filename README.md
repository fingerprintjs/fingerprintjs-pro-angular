<p align="center">
  <a href="https://fingerprint.com">
    <picture>
     <source media="(prefers-color-scheme: dark)" srcset="https://fingerprintjs.github.io/home/resources/logo_light.svg" />
     <source media="(prefers-color-scheme: light)" srcset="https://fingerprintjs.github.io/home/resources/logo_dark.svg" />
     <img src="https://raw.githubusercontent.com/fingerprintjs/fingerprint-pro-server-api-go-sdk/main/res/logo_dark.svg" alt="Fingerprint logo" width="312px" />
   </picture>
  </a>
<p align="center">
<a href="https://github.com/fingerprintjs/fingerprintjs-pro-angular/actions/workflows/ci.yml">
  <img src="https://github.com/fingerprintjs/fingerprintjs-pro-angular/actions/workflows/ci.yml/badge.svg" alt="CI badge" />
</a>
<a href="https://fingerprintjs.github.io/fingerprintjs-pro-angular/coverage/">
 <img src="https://fingerprintjs.github.io/fingerprintjs-pro-angular/coverage/badges.svg" alt="coverage">
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
<a href="https://fingerprintjs.github.io/fingerprintjs-pro-angular/">
  <img src="https://img.shields.io/badge/-Documentation-green" alt="Documentation">
</a>


# Fingerprint Pro Angular

Fingerprint Pro Angular SDK is an easy way to integrate  **[Fingerprint Pro](https://fingerprint.com/)** into your Angular application. See the [`src` folder](https://github.com/fingerprintjs/fingerprintjs-pro-angular/tree/main/src) for a full usage example.  

**This package works with Fingerprint Pro, it is not compatible with [the open-source FingerprintJS](https://github.com/fingerprintjs/fingerprintjs)**. See our documentation to learn more about the [difference between Fingerprint Pro and the open-source FingerprintJS](https://dev.fingerprint.com/docs/pro-vs-open-source).

## Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Getting started](#getting-started)
- [Caching strategy](#caching-strategy)
- [Documentation](#documentation)
- [Support and feedback](#support-and-feedback)
- [License](#license)

## Requirements

The following dependencies are required:

- TypeScript >=4.6
- Node 16+
- Angular 15+

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

To identify visitors, you'll need a Fingerprint Pro account (you can [sign up for free](https://dashboard.fingerprint.com/signup/)).
To get your API key and get started, see the [Quick Start guide in our documentation](https://dev.fingerprint.com/docs/quick-start-guide).

1. Add `FingerprintjsProAngularModule.forRoot()` to the imports sections in your root application module and pass it the `loadOptions` configuration object. You can specify multiple configuration options. Set a [region](https://dev.fingerprint.com/docs/regions) if you have chosen a non-global region during registration. Set `endpoint` and `scriptUrlPattern` if you are using [one of our proxy integrations to increase accuracy](https://dev.fingerprint.com/docs/protecting-the-javascript-agent-from-adblockers) and effectiveness of visitor identification.
Read more about other [forRoot() parameters](#fingerprintjsproangularmoduleforroot-props) below.

```javascript
import { NgModule } from '@angular/core';
import {
  FingerprintjsProAngularModule,
  // defaultEndpoint,
  // defaultScriptUrlPattern,
} from '@fingerprintjs/fingerprintjs-pro-angular';
// ...

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FingerprintjsProAngularModule.forRoot({
      loadOptions: {
        apiKey: 'your-fpjs-public-api-key',
        // region: 'eu',
        // endpoint: ['metrics.yourwebsite.com', defaultEndpoint],
        // scriptUrlPattern: ['metrics.yourwebsite.com/agent-path', defaultScriptUrlPattern],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

2. Inject `FingerprintjsProAngularService` in your component's constructor. Now you can identify visitors using the `getVisitorData()` method.

```typescript
import { Component } from '@angular/core';
import { FingerprintjsProAngularService } from '@fingerprintjs/fingerprintjs-pro-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private fingerprintjsProAngularService: FingerprintjsProAngularService) {}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  visitorId = 'Press "Identify" button to get visitorId';
  extendedResult: null | ExtendedGetResult | GetResult = null;

  async onIdentifyButtonClick() : Promise<void> {
    const data = await this.fingerprintjsProAngularService.getVisitorData();
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    this.visitorId = data.visitorId;
    this.extendedResult = data;
  }
}
```

## Server-side rendering (SSR) with Angular Universal

The library can be used with Angular Universal. Keep in mind that visitor identification is only possible in the browser, so your visitor identification code should only run client-side. See the example implementation for more details.

## Linking and tagging information
The `visitorId` provided by Fingerprint Identification is especially useful when combined with information you already know about your users, for example, account IDs, order IDs, etc. To learn more about various applications of the `linkedId` and `tag`, see [Linking and tagging information](https://dev.fingerprint.com/docs/tagging-information).

Associate your data with a visitor ID using the `linkedId` or `tag` parameter of the options object passed into the `useVisitorData()` hook or the `getData` function:
```ts
// ...

import { Component } from '@angular/core';
import { FingerprintjsProAngularService } from '@fingerprintjs/fingerprintjs-pro-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private fingerprintjsProAngularService: FingerprintjsProAngularService) {}
  
  async onIdentifyButtonClick() : Promise<void> {
    const data = await this.fingerprintjsProAngularService.getVisitorData({
      linkedId: "user_1234",
      tag: {
        userAction: "login",
        analyticsId: "UA-5555-1111-1"
      }
    });
    
    // ...
  }
}
```

## Caching strategy

Fingerprint Pro usage is billed per API call. To avoid unnecessary API calls, it is a good practice to [cache identification results](https://dev.fingerprint.com/docs/caching-visitor-information). By default, the SDK uses `sessionStorage` to cache results. 

* Specify `cacheLocation` on the `FingerprintjsProAngularModule.forRoot` props to instead store results in `memory` or  `localStorage`. Use `none` to disable caching completely.
* Specify `cache` on the `FingerprintjsProAngularModule.forRoot` props to use your custom cache implementation instead. For more details, see [Creating a custom cache](https://github.com/fingerprintjs/fingerprintjs-pro-spa#creating-a-custom-cache)
 in the Fingerprint Pro SPA repository (a lower-level Fingerprint library used by this SDK).
* Pass `{ignoreCache: true}` to the `getVisitorData()` function to ignore cached results for that specific API call.

> [!NOTE]
> If you use data from [`extendedResult`](https://dev.fingerprint.com/docs/js-agent#extendedresult), pay additional attention to your caching strategy.
> Some fields, for example, `ip` or `lastSeenAt`, might change over time for the same visitor. Use `getVisitorData({ ignoreCache: true })` to fetch the latest identification results.

## Documentation

This library uses Fingerprint Pro JavaScript agent under the hood. See our documentation for the full [JavaScript Agent API reference](https://dev.fingerprint.com/docs/js-agent).j

### `FingerprintjsProAngularModule`

The module just initializes the Fingerprint Pro JS agent with load options, configures caching strategy, and provides `FingerprintjsProAngularService` to DI.

#### `FingerprintjsProAngularModule.forRoot` props

`loadOptions: FingerprintJS.LoadOptions`

Options for the FingerprintJS JS Pro agent `load()` method. Options follow the [agent's initialization properties](https://dev.fingerprint.com/docs/js-agent#initializing-the-agent).

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

This method performs identification requests with the FingerprintJS Pro API. The returned object contains information about loading status, errors, and [the visitor](https://dev.fingerprint.com/docs/js-agent#extendedresult).

- `getOptions: GetOptions<TExtended>` parameter follows the parameters of the FingerprintJS Pro's [`get` function](https://dev.fingerprint.com/docs/js-agent#get-options).
- `ignoreCache: boolean` - set to `true` to always make a request to the API, even if the data is present in the cache.

#### `clearCache`

Clears the cache for the current caching strategy.

## Demo application

This repository contains an example Angular application. To run the demo locally:

1. Clone the repository with `git clone git@github.com:fingerprintjs/fingerprintjs-pro-angular.git`.
2. Inside the root folder, run `yarn install` to install the dependencies.
3. Create a dev environment file with `cp src/environments/environment.ts src/environments/environment.dev.ts`, and inside, replace `FingerprintJS Pro public key` with your actual public key.
4. Run `yarn generate:version` to create an SDK version file.
5. Run `yarn build` to build the SDK package.
6. Run `yarn start` to start the demo application.

The application will start on http://localhost:4200.

## Support and feedback
To ask questions or provide feedback, use [Issues](https://github.com/fingerprintjs/fingerprintjs-pro-angular/issues). If you need private support, please email us at `oss-support@fingerprint.com`. If you'd like to have a similar Angular wrapper for the [open-source FingerprintJS](https://github.com/fingerprintjs/fingerprintjs), consider creating an issue in the main [FingerprintJS repository](https://github.com/fingerprintjs/fingerprintjs/issues).

## API Reference

See the full [generated API reference](https://fingerprintjs.github.io/fingerprintjs-pro-angular/).

## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/fingerprintjs/fingerprintjs-pro-angular/blob/main/LICENSE) file for more info.
