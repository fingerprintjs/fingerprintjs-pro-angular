import { InjectionToken } from '@angular/core'
import { IFingerprintjsProSettings } from '../interfaces/i-fingerprintjs-pro-settings'

export const FINGERPTINTJS_PRO_ANGULAR_SETTINGS_TOKEN = new InjectionToken<IFingerprintjsProSettings>(
  'ng-fingerprintjspro-settings-token',
  {
    factory: () => ({ clientOptions: { loadOptions: { apiKey: '' } } }),
  }
)
