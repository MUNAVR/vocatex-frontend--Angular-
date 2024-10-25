import { CommonModule } from '@angular/common';
import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup ,FormsModule,ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ForgotPassService } from '../../../../core/services/job_seeker/auth/forgot_pass/forgot-pass.service';
import { ModalService } from '../../../../shared/model/modal.service';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,RouterLink],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotPassComponent {

  forgotPasswordForm!: FormGroup;
  isSubmitted = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:ForgotPassService,
    private modalService:ModalService,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  
  onSubmit() {
    if (this.forgotPasswordForm.invalid) return;
    
    this.authService.requestPasswordReset(this.forgotPasswordForm.value.email)
      .subscribe(
        response => {
          this.modalService.showModal(this.viewContainerRef, "Success", "OTP sent to your email", ['OK'])
          this.router.navigate(['/job_seeker_verify_otp_pass']); // Navigate to OTP verification
        },
        error => {
          this.modalService.showModal(this.viewContainerRef, "Error", "Error sending OTP. Please try again.", ['OK'])
        }
      );
  }


}


