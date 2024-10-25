import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyOtpPassComponent } from './verify-otp-pass.component';

describe('VerifyOtpPassComponent', () => {
  let component: VerifyOtpPassComponent;
  let fixture: ComponentFixture<VerifyOtpPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyOtpPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyOtpPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
