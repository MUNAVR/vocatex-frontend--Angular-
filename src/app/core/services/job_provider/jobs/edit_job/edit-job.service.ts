import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { providerapiUrl } from '../../../../api_urls/job_provider';

@Injectable({
  providedIn: 'root'
})
export class EditJobService {

  constructor(private http : HttpClient) { }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('access_token');
    }
    return null; // or handle the case where localStorage is not available
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders().set('Content-Type', 'application/json'); 
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`); // Add Authorization header if token is available
    }
  
    return headers;
  }
  

  editJobService(job_id: string, job_details: any): Observable<any> {
    const headers = this.getAuthHeaders(); 
    const url = `${providerapiUrl.editJobUrl}${job_id}/`; 
    return this.http.put<any>(url, job_details, { headers });
}

}
