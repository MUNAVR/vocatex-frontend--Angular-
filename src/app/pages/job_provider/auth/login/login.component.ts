import { CommonModule } from '@angular/common';
import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProviderRegisterComponent } from '../register/register.component';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProvderLoginService } from '../../../../core/services/job_provider/auth/login/providerloginservice.service';
import { HomeComponent } from '../../home/home/home.component';
import { ModalService } from '../../../../shared/model/modal.service';

declare var google: any;

@Component({
  selector: 'seeker-app-login',
  standalone: true,
  imports: [CommonModule,RouterLink,ProviderRegisterComponent,FormsModule,ReactiveFormsModule,HomeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class ProviderLoginComponent implements OnInit {
    loginForm:FormGroup;

    constructor(private fd:FormBuilder,
      private loginService:ProvderLoginService,
      private router:Router,
      private modalService:ModalService,
      private viewContainerRef: ViewContainerRef
    
    ){
      this.loginForm=this.fd.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]]
        
      });
    }

    ngOnInit(): void {
      if (this.loginService.isLoggedIn()) {
        const userRole = this.loginService.getRole();
        
        if (userRole === 'job_provider') {
          this.router.navigate(['job_provider_home']);
        } 
      }
    }
    

    login() {
      this.loginService.loginService(this.loginForm.value).subscribe({
        next: (res) => {
          // If login is successful, show success message
          this.modalService.showModal(this.viewContainerRef, "Success", "Login Successful", ['OK'])
            .then((result) => {
              this.loginForm.reset();
              if (result === undefined) {
                this.router.navigate(['job_provider_home']);  // Navigate to jobs page after OK click
              }
            });
        },
        error: (err) => {
          let errorMessage = 'An error occurred. Please try again.';
          
          // Check if error is 404 (Not Found)
          if (err.status === 404) {
            errorMessage = "This email is not registered.";
          } else if (err.status === 401) {
            errorMessage = "Incorrect email or password."; // For unauthorized access
          } else if (err.status === 500) {
            errorMessage = "Server error. Please try again later."; // Server error
          }
    
          // Show the appropriate error message in modal
          this.modalService.showModal(this.viewContainerRef, "Error", errorMessage, ['OK']);
        }
      });
    }

    google(): void {
      console.log('Google button clicked');
      google.accounts.id.initialize({
        client_id: '897102232394-gdqdtqogo6nbno5194t9g7svvd885ojo.apps.googleusercontent.com',
        callback: (response: any) => this.handleLogin(response),
      });
    
      
      google.accounts.id.renderButton(document.getElementById('google-button'), {
        theme: 'outline',
        size: 'large'
      });
    
      
      google.accounts.id.prompt();
    }
    
  
    handleLogin(response: any) {
      if (response) {
        const token = response.credential;  
    
        
        this.loginService.loginWithGoogle(token).subscribe(
          (data: any) => {
            localStorage.setItem('access_token', data.access_token);
            this.modalService.showModal(this.viewContainerRef, "Success", "Login Successful", ['OK'])
            this.router.navigate(['job_provider_home'])
            
          },
          (error) => {
            this.modalService.showModal(this.viewContainerRef, "Error", "Login Failed", ['OK'])
            console.error('Login failed:', error);
          }
        );
      }
    }
    

}
