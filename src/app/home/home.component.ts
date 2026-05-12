import { Component } from '@angular/core'
import { FingerprintService, Fingerprint } from '@fingerprintjs/fingerprintjs-pro-angular'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private FingerprintService: FingerprintService) {}

  eventId = 'Press "Identify" button to get eventId'
  result: Fingerprint.GetResult | null = null

  get resultJSON() {
    return JSON.stringify(this.result, null, 2)
  }

  async onButtonClick(): Promise<void> {
    try {
      const data = await this.FingerprintService.getVisitorData()
      this.eventId = data.event_id
      this.result = data
    } catch (error) {
      if (error instanceof Error) {
        this.eventId = `${error.name}: ${error.message}`
        this.result = null
      }
    }
  }

  onClearCacheClick() {
    this.FingerprintService.clearCache()
    this.eventId = 'Press button to get eventId again'
    this.result = null
  }
}
