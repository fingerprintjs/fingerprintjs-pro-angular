import { ModuleWithProviders, NgModule } from '@angular/core';
import { FINGERPTINTJS_PRO_ANGULAR_SETTINGS_TOKEN } from './tokens/fingerprintjs-pro-angular-settings-token';
import { IFingerprintjsProSettings } from './interfaces/i-fingerprintjs-pro-settings';
import { FingerprintjsProAngularService } from './fingerprintjs-pro-angular.service';
import { FpjsClientOptions } from '@fingerprintjs/fingerprintjs-pro-spa';

/**
 * Include FingerprintjsProAngularModule using `forRoot` method.
 *
 * @example ```typescript
 * import { NgModule } from '@angular/core';
 * import { FingerprintjsProAngularModule } from 'fingerprintjs-pro-angular';
 * // ...
 *
 * @NgModule({
 *   declarations: [AppComponent],
 *   imports: [
 *     BrowserModule,
 *     FingerprintjsProAngularModule.forRoot({loadOptions: {apiKey: 'your-fpjs-public-api-key'}})
 * //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *   ],
 *   providers: [],
 *   bootstrap: [AppComponent]
 * })
 * export class AppModule { }
 * ```
 */
@NgModule()
export class FingerprintjsProAngularModule {
  static forRoot(
    clientOptions: FpjsClientOptions,
  ): ModuleWithProviders<FingerprintjsProAngularModule> {
    return {
      ngModule: FingerprintjsProAngularModule,
      providers: [
        {
          provide: FINGERPTINTJS_PRO_ANGULAR_SETTINGS_TOKEN,
          useValue: {
            clientOptions,
          } as IFingerprintjsProSettings,
        },
        FingerprintjsProAngularService,
      ],
    };
  }
}
