import { ModuleWithProviders, NgModule } from '@angular/core';
import { NG_FINGERPTINTJS_PRO_SETTINGS_TOKEN } from './tokens/ng-fingerprintjs-pro-settings-token';
import { IFingerprintjsProSettings } from './interfaces/i-fingerprintjs-pro-settings';
import { NgFingerprintjsProService } from './ng-fingerprintjs-pro.service';
import { FpjsClientOptions } from '@fingerprintjs/fingerprintjs-pro-spa';

@NgModule()
export class NgFingerprintjsProModule {
  static forRoot(clientOptions: FpjsClientOptions): ModuleWithProviders<NgFingerprintjsProModule> {
    return {
      ngModule: NgFingerprintjsProModule,
      providers: [
        {
          provide: NG_FINGERPTINTJS_PRO_SETTINGS_TOKEN,
          useValue: {
            clientOptions
          } as IFingerprintjsProSettings
        },
        NgFingerprintjsProService
      ]
    }
  }
}
