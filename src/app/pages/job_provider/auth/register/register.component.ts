import { CommonModule } from '@angular/common';
import { Component ,ViewContainerRef} from '@angular/core';
import { ProviderLoginComponent } from '../login/login.component';
import { Router, RouterLink } from '@angular/router';
import { ProviderHomeComponent } from '../../landing/home.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProviderRegisterService } from '../../../../core/services/job_provider/auth/register/providerregisterservice.service';
import { confirmPasswordValidator } from '../../../../shared/validators/confirm_pass';
import { ModalService } from '../../../../shared/model/modal.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ProviderLoginComponent,RouterLink,ProviderHomeComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class ProviderRegisterComponent {
  registrationForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder,
    private registerservice:ProviderRegisterService,
    private router:Router,
    private modalService:ModalService,
    private viewContainerRef: ViewContainerRef
  
  
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Email pattern validation
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    });
  }

  register(){
    const formData={
      username:this.registrationForm.get('name')?.value,
      email:this.registrationForm.get('email')?.value,
      password:this.registrationForm.get('password')?.value
    }

    this.registerservice.registerService(formData)
      .subscribe({
        next:(res)=>{
          this.router.navigate(['/job_provider_otp'], { queryParams: { email: formData.email } });
          this.registrationForm.reset()
        },
        error:(err)=>{
          this.modalService.showModal(this.viewContainerRef, "Error", "Registration Failed ,Please check creadentials", ['OK']);
        }
      })

  }

}
