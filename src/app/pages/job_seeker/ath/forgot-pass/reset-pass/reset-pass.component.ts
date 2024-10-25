import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassService } from '../../../../../core/services/job_seeker/auth/forgot_pass/forgot-pass.service';
import { ModalService } from '../../../../../shared/model/modal.service';

@Component({
  selector: 'app-reset-pass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetPassComponent {

    resetPasswordForm: FormGroup;
    message: string = '';
    error: string = '';
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService:ForgotPassService,
      private modalService:ModalService,
      private viewContainerRef: ViewContainerRef,
    ) {
      this.resetPasswordForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        new_password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  
    onSubmit() {
      if (this.resetPasswordForm.invalid) return;
  
      this.authService.resetPassword(this.resetPasswordForm.value)
        .subscribe(
          response => {
            this.message = 'Password successfully reset!';
            this.router.navigate(['/job_seeker_login']);
          },
          error => {
            this.modalService.showModal(this.viewContainerRef, "Error", "Error resetting password. Please try again.", ['OK'])

            
          }
        );
    }

}
