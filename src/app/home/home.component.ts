import { Component } from '@angular/core'
import { FingerprintAngularService, Fingerprint } from '@fingerprintjs/fingerprintjs-pro-angular'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private fingerprintAngularService: FingerprintAngularService) {}

  eventId = 'Press "Identify" button to get eventId'
  extendedResult: Fingerprint.GetResult | null = null

  get extendedResultJSON() {
    return JSON.stringify(this.extendedResult, null, 2)
  }

  async onButtonClick(): Promise<void> {
    try {
      const data = await this.fingerprintAngularService.getVisitorData({
        extendedResult: true,
      } as any)
      this.eventId = data.event_id
      this.extendedResult = data
    } catch (error) {
      if (error instanceof Error) {
        this.eventId = `${error.name}: ${error.message}`
        this.extendedResult = null
      }
    }
  }

  onClearCacheClick() {
    this.fingerprintAngularService.clearCache()
    this.eventId = 'Press button to get eventId again'
    this.extendedResult = null
  }
}
