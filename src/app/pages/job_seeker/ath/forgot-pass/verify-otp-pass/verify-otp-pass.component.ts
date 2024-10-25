import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassService } from '../../../../../core/services/job_seeker/auth/forgot_pass/forgot-pass.service';
import { ModalService } from '../../../../../shared/model/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-otp-pass',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './verify-otp-pass.component.html',
  styleUrl: './verify-otp-pass.component.css'
})
export class VerifyOtpPassComponent {

  verifyOtpForm: FormGroup;
  message: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:ForgotPassService,
    private modalService:ModalService,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.verifyOtpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]]
    });
  }

  verifyOtp() {
    if (this.verifyOtpForm.invalid) return;

    this.authService.verifyOtp(this.verifyOtpForm.value)
      .subscribe(
        response => {
          this.modalService.showModal(this.viewContainerRef, "Success", "OTP Verified! You can now reset your password.", ['OK'])
          this.message = 'OTP Verified! You can now reset your password.';
          this.router.navigate(['/job_seeker_reset_pass']); // Navigate to reset password
        },
        error => {
          this.modalService.showModal(this.viewContainerRef, "Error", "Invalid OTP or OTP expired.", ['OK'])
          this.error = 'Invalid OTP or OTP expired.';
        }
      );
  }

}
