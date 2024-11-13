import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProviderLoginComponent } from '../auth/login/login.component';
import { ProviderRegisterComponent } from '../auth/register/register.component';
import { ProvderLoginService } from '../../../core/services/job_provider/auth/login/providerloginservice.service';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'provider-app-home',
  standalone: true,
  imports: [CommonModule,RouterLink,ProviderLoginComponent,ProviderRegisterComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class ProviderHomeComponent implements OnInit {
  constructor(
    private loginService: ProvderLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if the user is logged in
    if (this.isLoggedIn()) {
      this.router.navigate(['job_provider_home']); // Redirect to home if logged in
    }
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn(); 
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['job_index']);
  }

  postJob(): void {
    if (!this.isLoggedIn()) {
      // Redirect to login if not logged in
      this.router.navigate(['/job_provider_login']);
    } else {
      // If logged in, navigate to the post job page
      this.router.navigate(['/create_job']); // Adjust the route as needed
    }
  }
}
