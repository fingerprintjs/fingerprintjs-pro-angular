import { Inject, Injectable } from '@angular/core';
import { FpjsClient, GetOptions } from '@fingerprintjs/fingerprintjs-pro-spa';
import { FINGERPTINTJS_PRO_ANGULAR_SETTINGS_TOKEN } from './tokens/fingerprintjs-pro-angular-settings-token';
import { IFingerprintjsProSettings } from './interfaces/i-fingerprintjs-pro-settings';
import { packageVersion } from './version';

@Injectable({
  providedIn: 'root',
})
export class FingerprintjsProAngularService {
  private fingerprintJsClient: FpjsClient;
  private readonly fingerprintJsClientInitPromise: Promise<Object>;

  constructor(
    @Inject(FINGERPTINTJS_PRO_ANGULAR_SETTINGS_TOKEN)
    private readonly settings: IFingerprintjsProSettings,
  ) {
    const { loadOptions } = settings.clientOptions;
    const clientOptions = {
      ...settings.clientOptions,
      loadOptions: {
        ...loadOptions,
        integrationInfo: [
          ...(loadOptions.integrationInfo || []),
          `fingerprintjs-pro-angular/${packageVersion}`,
        ],
      },
    };
    this.fingerprintJsClient = new FpjsClient(clientOptions);
    this.fingerprintJsClientInitPromise = this.fingerprintJsClient.init();
  }
  async getVisitorData<TExtended extends boolean>(
    options?: GetOptions<TExtended>,
    ignoreCache?: boolean,
  ) {
    await this.fingerprintJsClientInitPromise;
    return this.fingerprintJsClient.getVisitorData(options, ignoreCache);
  }
  clearCache() {
    return this.fingerprintJsClient.clearCache();
  }
}
