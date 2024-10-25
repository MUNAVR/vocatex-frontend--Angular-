import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { providerapiUrl } from '../../../api_urls/job_provider';
import { JobDetails } from '../../../../models/jobDetails';
import { CreateJobService } from '../jobs/create-job.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient,private createJobService: CreateJobService) {

  }
  
  getJobsByProvider(): Observable<JobDetails[]> {
    const headers =this.createJobService.getAuthHeaders()
    return this.http.get<JobDetails[]>(providerapiUrl.get_jobs_by_provider, { headers });
  }

}
