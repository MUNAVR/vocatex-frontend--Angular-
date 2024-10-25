import { Injectable } from '@angular/core';
import { providerapiUrl } from '../../../../api_urls/job_provider';
import { HttpClient,} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProviderRegisterService {


  constructor(private http: HttpClient) {}

  registerService(registerObj: any): Observable<any> {
    return this.http.post<any>(providerapiUrl.authServiceApiRegister, registerObj);
  }

  verifyOtp(data: any) {
    return this.http.post(providerapiUrl.verifyOtpUrl, data);
  }


}
