
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobDetails } from '../../../../models/jobDetails';
import { LoginserviceService } from '../auth/login/loginservice.service';
import { apiUrl } from '../../../api_urls/job_seeker'; 

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  
  constructor(private http: HttpClient,private Loginservice: LoginserviceService) {

  }
  
  get_all_jobs_service(): Observable<JobDetails[]> {
    const headers =this.Loginservice.getAuthHeaders()
    return this.http.get<JobDetails[]>(apiUrl.get_all_jobs, { headers });
  }
  
}
