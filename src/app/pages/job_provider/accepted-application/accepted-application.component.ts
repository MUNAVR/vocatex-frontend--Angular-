import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../../core/services/job_provider/applications/application.service';
import { applications } from '../../../models/applications';
import { ProviderChatComponent } from '../provider-chat/provider-chat.component';

@Component({
  selector: 'app-accepted-application',
  standalone: true,
  imports: [SideBarComponent,CommonModule,FormsModule,ProviderChatComponent],
  templateUrl: './accepted-application.component.html',
  styleUrl: './accepted-application.component.css'
})
export class AcceptedApplicationComponent {
  acceptedApplications: applications[] = [];
  showMessageModal = false;
  selectedApplicant: any;

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

}
