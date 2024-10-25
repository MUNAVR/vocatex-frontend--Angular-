import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProvderLoginService } from '../../core/services/job_provider/auth/login/providerloginservice.service';
 // Make sure the path is correct

@Injectable({
  providedIn: 'root'
})
export class ProviderAuthGuard implements CanActivate {
  
  constructor(private loginService: ProvderLoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      return true;  
    } else {
      this.router.navigate(['/job_provider_login']);  
      return false; 
    }
  }
}

