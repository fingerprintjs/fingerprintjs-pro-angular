import { Component, OnInit } from '@angular/core'
import { FingerprintjsProAngularService } from '@fingerprintjs/fingerprintjs-pro-angular'

@Component({
  selector: 'app-preloaded',
  templateUrl: './preloaded.component.html',
  styleUrls: ['./preloaded.component.css'],
})
export class PreloadedComponent implements OnInit {
  constructor(private fingerprintjsProAngularService: FingerprintjsProAngularService) {
    fingerprintjsProAngularService.getVisitorData().then((visitorData) => (this.visitorId = visitorData.visitorId))
  }

  visitorId = 'Loading visitorId...'

  ngOnInit(): void {}
}
