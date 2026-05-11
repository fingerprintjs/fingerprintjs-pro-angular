import { Component, OnInit } from '@angular/core'
import { Fingerprint, FingerprintAngularService } from '@fingerprintjs/fingerprintjs-pro-angular'

@Component({
  selector: 'app-preloaded',
  templateUrl: './preloaded.component.html',
  styleUrls: ['./preloaded.component.css'],
})
export class PreloadedComponent implements OnInit {
  constructor(private fingerprintAngularService: FingerprintAngularService) {
    fingerprintAngularService
      .getVisitorData()
      .then((visitorData: Fingerprint.GetResult) => (this.eventId = visitorData.event_id))
  }

  eventId = 'Loading eventId...'

  ngOnInit(): void {}
}
