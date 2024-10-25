import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../../api_urls/job_seeker';
import { ResumeDetailsResponse } from '../../../../../models/resumeModels';


@Injectable({
  providedIn: 'root'
})
export class CreateResumeService {

  constructor(private http: HttpClient) {}

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

  createPersonalInfo(resumeStep1: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${apiUrl.create_personalinfo}`, resumeStep1,{ headers });
  }


  addAddress(resumeId: string, resumeStep2: any): Observable<any> {
    return this.http.post<any>(`${apiUrl.create_address}${resumeId}`, resumeStep2);
  }

  
  addSkills(resumeId: string, resumeStep3: any): Observable<any> {
    return this.http.post<any>(`${apiUrl.create_skills}${resumeId}`, resumeStep3);
  }

  
  addProjects(resumeId: string, resumeStep4: any): Observable<any> {
    return this.http.post<any>(`${apiUrl.create_project}${resumeId}`, resumeStep4);
  }

  
  addEducation(resumeId: string, resumeStep5: any): Observable<any> {
    return this.http.post<any>(`${apiUrl.create_education}${resumeId}`, resumeStep5);
  }

  
  addExperience(resumeId: string, resumeStep6: any): Observable<any> {
    return this.http.post<any>(`${apiUrl.create_experience}${resumeId}`, resumeStep6);
  }

  
  getResume(): Observable<ResumeDetailsResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<ResumeDetailsResponse>(apiUrl.get_resume,{ headers });
  }


}
