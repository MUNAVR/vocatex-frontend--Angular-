import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from '../../../../api_urls/job_seeker';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {

  constructor(private http: HttpClient, private router: Router) {}

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(apiUrl.forgot_pass, { email });
  }

  verifyOtp(data: { email: string, otp: string }): Observable<any> {
    return this.http.post(apiUrl.verify_reset, data);
  }

  resetPassword(data: { email: string, new_password: string }): Observable<any> {
    return this.http.post(apiUrl.reset_pass, data);
  }

}
