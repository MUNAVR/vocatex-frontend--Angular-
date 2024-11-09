import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApplyService } from '../../../core/services/job_seeker/apply/apply.service';
import { AppliedJobResponse } from '../../../models/applications';
import { SeekerChatComponent } from '../seeker-chat/seeker-chat.component';
import { InterviewComponentSeeker } from '../interview/interview.component';

@Component({
  selector: 'app-accepted-applied-jobs',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,SeekerChatComponent,InterviewComponentSeeker],
  templateUrl: './accepted-applied-jobs.component.html',
  styleUrl: './accepted-applied-jobs.component.css'
})
export class AcceptedAppliedJobsComponent {
  acceptedJobs: AppliedJobResponse[] = [];
  selectedApplicant: any;
  showMessageModal = false;
  showInterviewModal = false;

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


  openMessageModal(job: any) {
    this.selectedApplicant = job; // Set selected applicant
    this.showMessageModal = true; // Show the modal
  }

  closeMessageModal() {
    this.showMessageModal = false; // Close the modal
    this.selectedApplicant = null; // Reset selected applicant
  }

  openinterviewModal(application: any) {
    this.selectedApplicant = application; // Set selected applicant
    this.showInterviewModal = true; // Show the modal
  }

  closeinterviwModal() {
    this.showInterviewModal = false; // Close the modal
    this.selectedApplicant = null; // Reset selected applicant
  }

}
