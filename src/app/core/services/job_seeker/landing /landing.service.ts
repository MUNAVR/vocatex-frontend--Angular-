import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../api_urls/job_seeker';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http:HttpClient) { }

  searchJobs(jobTitle: string, location: string): Observable<any> {
    let params = new HttpParams();
    if (jobTitle) {
      params = params.append('title', jobTitle);
    }
    if (location) {
      params = params.append('location', location);
    }

    return this.http.get(apiUrl.search_job,{ params });
  }
}
