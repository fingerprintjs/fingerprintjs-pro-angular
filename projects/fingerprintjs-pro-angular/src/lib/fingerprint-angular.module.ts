import { ModuleWithProviders, NgModule } from '@angular/core'
import { FINGERPRINT_ANGULAR_SETTINGS_TOKEN } from './tokens/fingerprint-angular-settings-token'
import { FingerprintSettings } from './interfaces/fingerprint-settings'

/**
 * Include FingerprintAngularModule using `forRoot` method.
 *
 * @example ```typescript
 * import { NgModule } from '@angular/core';
 * import { FingerprintAngularModule } from '@fingerprintjs/fingerprintjs-pro-angular';
 * // ...
 *
 * @NgModule({
 *   declarations: [AppComponent],
 *   imports: [
 *     BrowserModule,
 *     FingerprintAngularModule.forRoot({startOptions: {apiKey: 'your-fp-public-api-key'}})
 *   ],
 *   providers: [],
 *   bootstrap: [AppComponent]
 * })
 * export class AppModule { }
 * ```
 */
@NgModule()
export class FingerprintAngularModule {
  static forRoot(settings: FingerprintSettings): ModuleWithProviders<FingerprintAngularModule> {
    return {
      ngModule: FingerprintAngularModule,
      providers: [
        {
          provide: FINGERPRINT_ANGULAR_SETTINGS_TOKEN,
          useValue: settings,
        },
      ],
    }
  }
}
