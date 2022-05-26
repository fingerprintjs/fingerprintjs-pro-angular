import { Inject, Injectable } from '@angular/core';
import { FpjsClient, GetOptions } from '@fingerprintjs/fingerprintjs-pro-spa';
import { NG_FINGERPTINTJS_PRO_SETTINGS_TOKEN } from './tokens/ng-fingerprintjs-pro-settings-token';
import { IFingerprintjsProSettings } from './interfaces/i-fingerprintjs-pro-settings';
import { packageVersion } from './version';

@Injectable({
  providedIn: 'root'
})
export class NgFingerprintjsProService {
  private fingerprintJsClient: FpjsClient;
  private readonly fingerprintJsClientInitPromise: Promise<Object>;

  constructor(
    @Inject(NG_FINGERPTINTJS_PRO_SETTINGS_TOKEN) private readonly settings: IFingerprintjsProSettings
  ) {
    const { loadOptions } = settings.clientOptions;
    const clientOptions = {
      ...settings.clientOptions,
      loadOptions: {
        ...loadOptions,
        integrationInfo: [...(loadOptions.integrationInfo || []), `fingerprintjs-pro-angular/${packageVersion}`],
      }
    };
    this.fingerprintJsClient = new FpjsClient(clientOptions);
    this.fingerprintJsClientInitPromise = this.fingerprintJsClient.init();
  }
  async getVisitorData(options?: GetOptions<boolean>) {
    await this.fingerprintJsClientInitPromise;
    return this.fingerprintJsClient.getVisitorData(options);
  }
  clearCache() {
    return this.fingerprintJsClient.clearCache();
  }
}
