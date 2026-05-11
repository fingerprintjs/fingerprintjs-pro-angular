import { Inject, Injectable } from '@angular/core'
import { Fingerprint } from '@fingerprint/agent'
import { packageVersion } from './version'
import { FINGERPRINT_ANGULAR_SETTINGS_TOKEN } from './fingerprint-angular-settings.token'
import { FingerprintSettings } from './interfaces/fingerprint-settings'

/**
 * Inject FingerprintAngularService and use it to make identification requests.
 *
 * @example ```typescript
 * import { Component, OnInit } from '@angular/core';
 * import { FingerprintAngularService } from '@fingerprintjs/fingerprintjs-pro-angular';
 *
 * @Component({
 *   selector: 'app-home',
 *   templateUrl: './home.component.html',
 *   styleUrls: ['./home.component.css']
 * })
 * export class HomeComponent implements OnInit {
 *
 *   constructor(private fingerprintAngularService: FingerprintAngularService) { }
 *
 *   eventId = 'Press "Identify" button to get eventId';
 *
 *   async onIdentifyButtonClick() : Promise<void> {
 *     const data = await this.fingerprintAngularService.getVisitorData();
 *     this.eventId = data.event_id;
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class FingerprintAngularService {
  private readonly publicAgent: Fingerprint.Agent
  private readonly settings: FingerprintSettings

  constructor(@Inject(FINGERPRINT_ANGULAR_SETTINGS_TOKEN) settings: FingerprintSettings) {
    this.settings = settings
    const { startOptions } = settings
    const integrationInfo = startOptions.integrationInfo || []
    this.publicAgent = Fingerprint.start({
      ...startOptions,
      integrationInfo: [...integrationInfo, `angular/${packageVersion}`],
    })
  }

  getVisitorData(getDataOptions?: Fingerprint.GetOptions): Promise<Fingerprint.GetResult> {
    return this.publicAgent.get(getDataOptions)
  }

  collectData(collectOptions?: Fingerprint.GetOptions): Promise<string> {
    return this.publicAgent.collect(collectOptions)
  }

  /**
   * Clears the visitor data cache.
   *
   * By default, the JS agent caches the visitor data in the storage specified in the `cache` option.
   * This method clears that storage.
   */
  clearCache(): void {
    const cacheConfig = this.settings.startOptions.cache
    if (!cacheConfig) {
      return
    }

    const { storage, cachePrefix } = cacheConfig
    const prefix = cachePrefix || 'fpjs_cache'

    let storageEngine: Storage | undefined
    if (storage === 'localStorage') {
      storageEngine = window.localStorage
    } else if (storage === 'sessionStorage') {
      storageEngine = window.sessionStorage
    }

    if (storageEngine) {
      for (let i = 0; i < storageEngine.length; i++) {
        const key = storageEngine.key(i)
        if (key?.startsWith(prefix)) {
          storageEngine.removeItem(key)
          i--
        }
      }
    }
  }
}
