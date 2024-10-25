import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginserviceService } from '../../../../core/services/job_seeker/auth/login/loginservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobDetails, user_basic_details } from '../../../../models/jobDetails';
import { HomeService } from '../../../../core/services/job_seeker/home/home.service';
import { ApplyService } from '../../../../core/services/job_seeker/apply/apply.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class SeekerHomeComponent {

  jobs: JobDetails[] = [];
  username:string=''

  constructor(private router:Router,
    private loginService:LoginserviceService,
    private applyService: ApplyService,
    private homeService:HomeService  ){

      this.loadJobs()
      this.get_user_details()
     }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['job_index'])
  }

  loadJobs(): void {
    this.homeService.get_all_jobs_service().subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }

  get_user_details(): void {
    this.applyService.user_detials().subscribe(
      (data: user_basic_details) => {
        this.username = data.first_name ; // Set user details
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  


}
