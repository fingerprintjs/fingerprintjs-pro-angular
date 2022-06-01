import { ModuleWithProviders, NgModule } from '@angular/core';
import { FINGERPTINTJS_PRO_ANGULAR_SETTINGS_TOKEN } from './tokens/fingerprintjs-pro-angular-settings-token';
import { IFingerprintjsProSettings } from './interfaces/i-fingerprintjs-pro-settings';
import { FingerprintjsProAngularService } from './fingerprintjs-pro-angular.service';
import { FpjsClientOptions } from '@fingerprintjs/fingerprintjs-pro-spa';

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
