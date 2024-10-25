import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProviderRegisterService } from '../../../../core/services/job_provider/auth/register/providerregisterservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../../../shared/model/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent implements OnInit{
  otpForm: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private registerService:ProviderRegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService:ModalService,
     private viewContainerRef: ViewContainerRef
  ) {
    this.otpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // User's email
      otp: ['', [Validators.required, Validators.minLength(6)]], // OTP input
    });
  }

  ngOnInit(): void {
    // Get email from the route query params
    this.route.queryParams.subscribe((params) => {
      this.otpForm.patchValue({ email: params['email'] });
    });
  }

  verifyOtp() {
    if (this.otpForm.invalid) {
      return;
    }

    const formData = this.otpForm.value;
    this.registerService.verifyOtp(formData).subscribe({
      next: (res) => {
        this.router.navigate(['job_provider_login'])
      },
      error: (err) => {
        this.modalService.showModal(this.viewContainerRef, "Error", "OTP verification failed.", ['OK'])
        console.error(err);
      },
    });
  }
}
