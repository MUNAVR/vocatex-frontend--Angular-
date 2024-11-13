import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../../core/services/job_provider/applications/application.service';
import { applications } from '../../../models/applications';
import { ProviderChatComponent } from '../provider-chat/provider-chat.component';
import { InterviewComponent } from '../interview/interview.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-accepted-application',
  standalone: true,
  imports: [SideBarComponent, CommonModule, FormsModule, ProviderChatComponent, InterviewComponent, NgxPaginationModule],
  templateUrl: './accepted-application.component.html',
  styleUrl: './accepted-application.component.css'
})
export class AcceptedApplicationComponent {
  acceptedApplications: applications[] = [];
  showMessageModal = false;
  showInterviewModal = false;
  selectedApplicant: any;
  currentPage: number = 1; // Current page for pagination

  constructor(
    private ApplicationService: ApplicationService,
  ){
    this.loadacceptedApplication()
  }

  loadacceptedApplication(){
    this.ApplicationService.getAcceptedApplicationsForCompany().subscribe(
      (applications) => {
        this.acceptedApplications = applications;
      },
      (error) => {
        console.error('Error fetching accepted applications:', error);
      }
    );
  }

  openMessageModal(application: any) {
    this.selectedApplicant = application; // Set selected applicant
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
