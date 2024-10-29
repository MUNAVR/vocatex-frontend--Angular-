import { Injectable } from '@angular/core';
import { apiUrl } from '../../../api_urls/job_seeker';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user_basic_details } from '../../../../models/jobDetails';
import { create_application, job_comapany_details } from '../../../../models/applyModel';
import { AnyARecord } from 'dns';
import { Observable } from 'rxjs';
import { AppliedJobResponse } from '../../../../models/applyModel';


@Injectable({
  providedIn: 'root'
})
export class ApplyService {



  constructor(private http:HttpClient) { }

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

  user_detials(){
    const headers = this.getAuthHeaders(); 
    return this.http.get<user_basic_details>(apiUrl.user_basic_details,{headers})
  }

  getJobDetails(job_id: string) {
    const headers = this.getAuthHeaders(); 
    return this.http.get<job_comapany_details>(`${apiUrl.job_comapany_details}${job_id}`, { headers });
  }

  createJobApplication(jobId: string, resume: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('resume_file', resume);  // Append the file
    
    // Do NOT manually set 'Content-Type' here; let the browser handle it
    let headers = this.getAuthHeaders().delete('Content-Type'); // Remove 'Content-Type' for multipart/form-data

    return this.http.post<any>(`${apiUrl.create_application}${jobId}`, formData, { headers });
  }

  getAppliedJobs(): Observable<AppliedJobResponse[]> {
    const headers = this.getAuthHeaders(); 
    return this.http.get<AppliedJobResponse[]>(apiUrl.applied_jobs,{ headers });
  }

  getAcceptedAppliedJobsForUser(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<AppliedJobResponse[]>(apiUrl.accepted_applied_jobs,{headers});
  }


  
  

}
