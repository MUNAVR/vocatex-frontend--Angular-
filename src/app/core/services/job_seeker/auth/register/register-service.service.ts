import { Injectable } from '@angular/core';
import { apiUrl } from '../../../../api_urls/job_seeker';
import { HttpClient,} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);


  constructor(private http: HttpClient, private router: Router) {}

  registerService(registerObj: any): Observable<any> {
    return this.http.post<any>(apiUrl.authServiceApiRegister, registerObj);
  }

  verifyOtp(data: any) {
    return this.http.post(apiUrl.verifyOtpUrl, data);
  }


}
