import { CommonModule } from '@angular/common';
import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { SearchComponent } from '../../search/search.component';
import { SeekerRegisterComponent } from '../register/register.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginserviceService } from '../../../../core/services/job_seeker/auth/login/loginservice.service';
import { SeekerHomeComponent } from '../../home/home/home.component';
import { ModalService } from '../../../../shared/model/modal.service';
import { ForgotPassComponent } from '../forgot-pass/forgot-pass.component';

declare var google: any;


@Component({
  selector: 'app-seeker-login',
  standalone: true,
  imports: [
    CommonModule,SearchComponent,SeekerRegisterComponent,RouterLink,CommonModule,FormsModule,ReactiveFormsModule,
    SeekerHomeComponent,ForgotPassComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class SeekerLoginComponent implements OnInit {
    loginForm:FormGroup;
    returnUrl: string = '';
    

    constructor(private fd:FormBuilder, 
      private loginService:LoginserviceService ,
      private router:Router,
      private modalService:ModalService,
      private viewContainerRef: ViewContainerRef,
      private route: ActivatedRoute
      
      
      ){
      this.loginForm=this.fd.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]]
        
      });

      this.route.queryParams.subscribe(params => {
        this.returnUrl = params['returnUrl'] || '/job_index';
      });
    }

    ngOnInit(): void {
      if (this.loginService.isLoggedIn()) {
        const userRole = this.loginService.getRole();
        
        if (userRole === 'job_seeker') {
          this.router.navigate(['job_seeker_home']);
        } 
      }
    }

    login(){
      this.loginService.loginService(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          localStorage.setItem('access_token', res.access_token);
          console.log(this.loginService.getToken())
          this.modalService.showModal(this.viewContainerRef, "Success", "Login Successful", ['OK'])
          this.loginForm.reset()
          this.router.navigate([this.returnUrl]);
        },
        error:(err)=>{
          this.modalService.showModal(this.viewContainerRef, "Error", "Please Check the Email", ['OK'])
          console.log(err)
        }
      })

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
            this.router.navigate(['job_index'])
            
          },
          (error) => {
            this.modalService.showModal(this.viewContainerRef, "Error", "Login Failed", ['OK'])
            console.error('Login failed:', error);
          }
        );
      }
    }
    
}
