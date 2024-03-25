import { Component } from '@angular/core'
import { FingerprintjsProAngularService, GetResult, ExtendedGetResult } from '@fingerprintjs/fingerprintjs-pro-angular'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private fingerprintjsProAngularService: FingerprintjsProAngularService) {}

  visitorId = 'Press "Identify" button to get visitorId'
  extendedResult: GetResult | ExtendedGetResult | null = null

  get extendedResultJSON() {
    return JSON.stringify(this.extendedResult, null, 2)
  }

  async onButtonClick(): Promise<void> {
    try {
      const data = await this.fingerprintjsProAngularService.getVisitorData({
        extendedResult: true,
      })
      this.visitorId = data.visitorId
      this.extendedResult = data
    } catch (error) {
      if (error instanceof Error) {
        this.visitorId = `${error.name}: ${error.message}`
        this.extendedResult = null
      }
    }
  }

  onClearCacheClick() {
    this.fingerprintjsProAngularService.clearCache()
    this.visitorId = 'Press button to get visitorId again'
    this.extendedResult = null
  }
}
