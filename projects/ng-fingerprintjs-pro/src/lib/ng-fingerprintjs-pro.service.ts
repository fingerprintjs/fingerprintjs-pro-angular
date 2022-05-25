import { Inject, Injectable } from '@angular/core';
import { FpjsClient, GetOptions } from '@fingerprintjs/fingerprintjs-pro-spa';
import { NG_FINGERPTINTJS_PRO_SETTINGS_TOKEN } from './tokens/ng-fingerprintjs-pro-settings-token';
import { IFingerprintjsProSettings } from './interfaces/i-fingerprintjs-pro-settings';

@Injectable({
  providedIn: 'root'
})
export class NgFingerprintjsProService {
  private fingerprintJsAgent: FpjsClient
  constructor(
    @Inject(NG_FINGERPTINTJS_PRO_SETTINGS_TOKEN) private readonly settings: IFingerprintjsProSettings
  ) {
    console.log('NgFingerprintjsProService constructor', settings);
    this.fingerprintJsAgent = new FpjsClient(settings.clientOptions)
    this.fingerprintJsAgent.init();
  }
  getVisitorData(options?: GetOptions<boolean>) {
    return this.fingerprintJsAgent.getVisitorData(options);
  }
  clearCache() {
    return this.fingerprintJsAgent.clearCache();
  }
}
