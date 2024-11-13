import { Component, ViewContainerRef } from '@angular/core';
import { ProviderHomeComponent } from '../../landing/home.component';
import { ProvderLoginService } from '../../../../core/services/job_provider/auth/login/providerloginservice.service';
import { Router, RouterLink } from '@angular/router';
import { CreateJobComponent } from '../../jobs/create-job/create-job.component';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../../../core/services/job_provider/home/home.service';
import { JobDetails } from '../../../../models/jobDetails';
import { EditJobComponent } from '../../jobs/edit-job/edit-job.component';
import { ModalService } from '../../../../shared/model/modal.service';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProviderHomeComponent,
    CreateJobComponent,
    CommonModule,
    RouterLink,
    EditJobComponent,
    SideBarComponent,
    NgxPaginationModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  jobs: JobDetails[] = [];
  username: string = "";
  currentPage: number = 1;  // Added for pagination

  constructor(
    private loginService: ProvderLoginService,
    private router: Router, 
    private homeService: HomeService,
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.loadJobs();
    this.getUsername();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['job_provider_login']);
  }

  loadJobs(): void {
    this.homeService.getJobsByProvider().subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'An unexpected error occurred. Please try again later.';
        this.modalService.showModal(this.viewContainerRef, "Error", errorMessage, ['OK']);
      }
    });
  }

  getUsername(): void {
    this.username = localStorage.getItem('user_name') || '';
    if (this.username) {
      console.log(`Username: ${this.username}`);
    } else {
      console.log('No username found in local storage.');
    }
  }
}
