import { InjectionToken } from '@angular/core'
import { FingerprintSettings } from '../interfaces/fingerprint-settings'

export const FINGERPRINT_ANGULAR_SETTINGS_TOKEN = new InjectionToken<FingerprintSettings>(
  'ng-fingerprint-settings-token',
  {
    factory: () => ({ startOptions: { apiKey: '' } }),
  }
)
