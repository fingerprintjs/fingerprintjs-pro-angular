import { Component, OnInit } from '@angular/core';
import { NgFingerprintjsProService, GetResult, ExtendedGetResult } from 'ng-fingerprintjs-pro';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ngFingerprintjsProService: NgFingerprintjsProService) { }

  visitorId = 'Press "Identify" button to get visitorId';
  extendedResult: GetResult | ExtendedGetResult | null = null;

  get extendedResultJSON() {
    return JSON.stringify(this.extendedResult, null, 2);
  }

  ngOnInit(): void {
  }

  async onButtonClick() : Promise<void> {
    try {
      const data = await this.ngFingerprintjsProService.getVisitorData({extendedResult: true});
      this.visitorId = data.visitorId;
      this.extendedResult = data;
    } catch (error) {
      if (error instanceof Error) {
        this.visitorId = `${error.name}: ${error.message}`;
        this.extendedResult = null;
      }
    }
  }

  onClearCacheClick() {
    this.ngFingerprintjsProService.clearCache();
    this.visitorId = 'Press button to get visitorId again';
    this.extendedResult = null;
  }

}
