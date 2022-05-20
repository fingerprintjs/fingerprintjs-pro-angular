import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFingerprintjsProComponent } from './ng-fingerprintjs-pro.component';

describe('NgFingerprintjsProComponent', () => {
  let component: NgFingerprintjsProComponent;
  let fixture: ComponentFixture<NgFingerprintjsProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgFingerprintjsProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFingerprintjsProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
