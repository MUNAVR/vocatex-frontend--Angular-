import { Component, ViewContainerRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginserviceService } from '../../../../core/services/job_seeker/auth/login/loginservice.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobDetails, user_basic_details } from '../../../../models/jobDetails';
import { HomeService } from '../../../../core/services/job_seeker/home/home.service';
import { ApplyService } from '../../../../core/services/job_seeker/apply/apply.service';
import { LandingService } from '../../../../core/services/job_seeker/landing /landing.service';
import { ModalService } from '../../../../shared/model/modal.service';
import { SearchResultModalComponent } from '../../../../models/search-result-modal/search-result-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterLink,
    FormsModule, 
    SearchResultModalComponent,
    ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class SeekerHomeComponent {
  jobs: JobDetails[] = [];
  filteredJobs: JobDetails[] = [];
  username: string = '';
  selectedDate: string = 'all';
  selectedWorkMode: string = 'Work From Home';
  selectedWorkType: string = 'Full Time';
  searchForm: FormGroup; // Define the form group
  isLoading = false;
  isModalOpen: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private loginService: LoginserviceService,
    private applyService: ApplyService,
    private homeService: HomeService,
    private job_service: LandingService,
    private modalService:ModalService,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.loadJobs();
    this.getUserDetails();
    this.searchForm = this.fb.group({ 
      skill: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', Validators.required]
    });
    
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['job_index']);
  }

  loadJobs(): void {
    this.homeService.get_all_jobs_service().subscribe({
      next: (data) => {
        this.jobs = data;
        this.filteredJobs = data; // Initially, show all jobs
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }

  getUserDetails(): void {
    this.applyService.user_detials().subscribe(
      (data: user_basic_details) => {
        this.username = data.first_name; // Set user details
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  applyFilters(): void {
    console.log("Applying filters:", this.selectedDate, this.selectedWorkMode, this.selectedWorkType);

    const selectedWorkModeNormalized = this.selectedWorkMode.trim().toLowerCase().replace(/\s+/g, '');
    const selectedWorkTypeNormalized = this.selectedWorkType.trim().toLowerCase().replace(/\s+/g, '');

    this.filteredJobs = this.jobs.filter(job => {
        const jobModeNormalized = job.job_mode.toLowerCase().replace(/\s+/g, '').trim();
        const jobTypeNormalized = job.job_type.toLowerCase().replace(/\s+/g, '').trim();

        const matchesDate = this.filterByDate(job);
        const matchesWorkMode = selectedWorkModeNormalized === jobModeNormalized;
        const matchesWorkType = selectedWorkTypeNormalized === jobTypeNormalized;

        return matchesDate && matchesWorkMode && matchesWorkType;
    });

    console.log("Filtered Jobs:", this.filteredJobs);
}



  filterByDate(job: JobDetails): boolean {
      if (this.selectedDate === 'all') return true;

      const postedDate = new Date(job.created_at);
      const today = new Date();
      if (this.selectedDate === 'last7') {
          return (today.getTime() - postedDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
      } else if (this.selectedDate === 'last30') {
          return (today.getTime() - postedDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
      }
      return false;
  }
  searchJobs(): void {
    if (this.searchForm.invalid) {
      return; // Exit if form is invalid
    }

    this.isLoading = true; // Set loading state to true

    const { jobTitle, location } = this.searchForm.value; // Get form values

    this.job_service.searchJobs(jobTitle, location).subscribe({
      next: (data) => {

        this.searchForm.reset(); // Reset the form

        this.jobs = data;
        this.isModalOpen = true; 
      },
      error: (err) => {
        this.modalService.showModal(this.viewContainerRef, "Error", "Error searching jobs", ['OK'])

      },
      complete: () => {
        this.isLoading = false; 
      }
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
  }





}
