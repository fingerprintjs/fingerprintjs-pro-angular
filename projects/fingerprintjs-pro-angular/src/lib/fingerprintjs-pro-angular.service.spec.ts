import { TestBed } from '@angular/core/testing';

import { FingerprintjsProAngularService } from './fingerprintjs-pro-angular.service';

describe('FingerprintjsProAngularService', () => {
  let service: FingerprintjsProAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FingerprintjsProAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
