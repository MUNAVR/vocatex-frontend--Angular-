import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { providerapiUrl } from '../../../api_urls/job_provider';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders().set('Content-Type', 'application/json'); 
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`); 
    }
    return headers;
  }

  getReceivedApplications(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(providerapiUrl.recevied_applications,{headers});
  }

  acceptApplication(applicationId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${providerapiUrl.accept_applications}${applicationId}`, {}, { headers });
  }

  rejectApplication(applicationId: string): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.put<any>(`${providerapiUrl.reject_applications}${applicationId}`, {}, { headers });
  }

  getAcceptedApplicationsForCompany(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(providerapiUrl.accepted_applications,{headers});
  }



}
