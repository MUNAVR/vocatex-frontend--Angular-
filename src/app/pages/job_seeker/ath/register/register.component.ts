import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchComponent } from '../../search/search.component';
import { CommonModule } from '@angular/common';
import { SeekerLoginComponent } from '../login/login.component';
import { confirmPasswordValidator } from '../../../../shared/validators/confirm_pass';
import { RegisterServiceService } from '../../../../core/services/job_seeker/auth/register/register-service.service';
import { ModalService } from '../../../../shared/model/modal.service';

@Component({
  selector: 'app-seeker-register',
  standalone: true,
  imports: [
    CommonModule,RouterLink,SearchComponent,SeekerLoginComponent,FormsModule,ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class SeekerRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder,
     private registerservice:RegisterServiceService,
     private router:Router,
     private modalService:ModalService,
     private viewContainerRef: ViewContainerRef
    
    ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]], 
      confirmPassword: ['', Validators.required],
    }, {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {}

  register(){
    const formData={
      username:this.registrationForm.get('name')?.value,
      email:this.registrationForm.get('email')?.value,
      password:this.registrationForm.get('password')?.value
    }

    this.registerservice.registerService(formData)
      .subscribe({
        next:(res)=>{
          this.registrationForm.reset()
          this.router.navigate(['/otp-verification'], { queryParams: { email: formData.email } });
        },
        error:(err)=>{
          this.modalService.showModal(this.viewContainerRef, "Error", "Registration Failed ,Please check creadentials", ['OK'])
          console.log(err)
        }
      })

  }
}

