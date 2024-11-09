import { CommonModule } from '@angular/common';
import { Component, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ApplicationService } from '../../../core/services/job_provider/applications/application.service';
import { applications } from '../../../models/applications';
import { AcceptButtonComponent } from '../accept-button/accept-button.component';
import { RejectButtonComponent } from '../reject-button/reject-button.component';
import { ModalService } from '../../../shared/model/modal.service';
import { ProvderLoginService } from '../../../core/services/job_provider/auth/login/providerloginservice.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SideBarComponent, AcceptButtonComponent, RejectButtonComponent],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'] // Corrected styleUrls
})
export class ApplicationsComponent {

  applications: applications[] = [];

  constructor(
    private ApplicationService: ApplicationService,
    private router: Router,
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private loginService:ProvderLoginService
  ) {
    this.fetchReceivedApplications();
  }

  fetchReceivedApplications() {
    this.ApplicationService.getReceivedApplications().subscribe(
      (data) => {
        this.applications = data;
      },
      (error) => {
        console.error('Error fetching received applications', error);
      }
    );
  }

  handleReject(applicationId: string) {
    this.ApplicationService.rejectApplication(applicationId).subscribe(
      () => {
        this.modalService.showModal(this.viewContainerRef, "Success", "Rejected Successfully!", ['OK']);
        this.applications = this.applications.filter(app => app.application_id !== applicationId);
      },
      (error) => {
        this.modalService.showModal(this.viewContainerRef, "Error", "Error rejecting application!", ['OK']);
        console.error("Error rejecting application:", error);
      }
    );
  }

  refreshApplications() {
    this.fetchReceivedApplications(); // Corrected method to re-fetch application data
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['job_provider_login'])
  }
}
