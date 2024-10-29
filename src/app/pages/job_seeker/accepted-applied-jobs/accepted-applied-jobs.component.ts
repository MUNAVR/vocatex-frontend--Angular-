import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApplyService } from '../../../core/services/job_seeker/apply/apply.service';
import { AppliedJobResponse } from '../../../models/applications';

@Component({
  selector: 'app-accepted-applied-jobs',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './accepted-applied-jobs.component.html',
  styleUrl: './accepted-applied-jobs.component.css'
})
export class AcceptedAppliedJobsComponent {
  acceptedJobs: AppliedJobResponse[] = [];
  showMessageArea = false;

  constructor(
    private ApplyService:ApplyService
  ){
    this.Applied_accepted_jobs_load()
  }

  Applied_accepted_jobs_load(){
    this.ApplyService.getAcceptedAppliedJobsForUser().subscribe(
      (jobs) => {
        this.acceptedJobs = jobs;
      },
      (error) => {
        console.error('Error fetching accepted jobs:', error);
      }
    );
  }

  toggleMessageArea() {
    this.showMessageArea = !this.showMessageArea;
  }

}
