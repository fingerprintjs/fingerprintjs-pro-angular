import { InjectionToken } from '@angular/core';
import { IFingerprintjsProSettings } from '../interfaces/i-fingerprintjs-pro-settings';

export const NG_FINGERPTINTJS_PRO_SETTINGS_TOKEN = new InjectionToken<IFingerprintjsProSettings>('ng-fingerprintjspro-settings-token', {
  factory: () => ({clientOptions: {loadOptions: {apiKey: ''}}})
});
