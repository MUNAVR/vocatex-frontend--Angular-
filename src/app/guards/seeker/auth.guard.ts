import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginserviceService } from '../../core/services/job_seeker/auth/login/loginservice.service';
 // Make sure the path is correct

@Injectable({
  providedIn: 'root'
})
export class SeekerAuthGuard implements CanActivate {
  
  constructor(private loginService:LoginserviceService , private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("here")
    if (this.loginService.isLoggedIn()) {
      console.log("logged")
      return true;
    } else {
      console.log("not logged")
      this.router.navigate(['/job_seeker_login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
  
}