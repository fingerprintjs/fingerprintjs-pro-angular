import { TestBed } from '@angular/core/testing';

import { NgFingerprintjsProService } from './ng-fingerprintjs-pro.service';

describe('NgFingerprintjsProService', () => {
  let service: NgFingerprintjsProService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgFingerprintjsProService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
