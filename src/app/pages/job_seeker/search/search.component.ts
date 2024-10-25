import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary classes for reactive forms
import { SeekerLoginComponent } from '../ath/login/login.component';
import { SeekerRegisterComponent } from '../ath/register/register.component';
import { ProviderHomeComponent } from '../../job_provider/landing/home.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ResumeComponent } from '../resume/resume/resume.component';
import { PortfolioHomeComponent } from '../portfolio/portfolio-home/portfolio-home.component';
import { LoginserviceService } from '../../../core/services/job_seeker/auth/login/loginservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { SearchResultModalComponent } from '../../../models/search-result-modal/search-result-modal.component';
import { LandingService } from '../../../core/services/job_seeker/landing /landing.service';
import { ModalService } from '../../../shared/model/modal.service';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    SeekerLoginComponent,
    SeekerRegisterComponent,
    ProviderHomeComponent,
    CommonModule,
    RouterLink,
    ResumeComponent,
    PortfolioHomeComponent,
    FormsModule,
    ReactiveFormsModule, 
    SearchResultModalComponent,
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchForm: FormGroup; // Define the form group
  isLoading = false;
  jobs: any[] = [];
  isModalOpen: boolean = false;

  constructor(
    private fb: FormBuilder, // Inject FormBuilder
    private loginService: LoginserviceService,
    private router: Router,
    private job_service: LandingService,
    private modalService:ModalService,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.isLoggedIn();
    this.searchForm = this.fb.group({ // Initialize the form group with form controls
      jobTitle: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', Validators.required]
    });
  }


  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['job_index']);
  }

  searchJobs(): void {
    if (this.searchForm.invalid) {
      return; // Exit if form is invalid
    }

    this.isLoading = true; // Set loading state to true

    const { jobTitle, location } = this.searchForm.value; // Get form values

    this.job_service.searchJobs(jobTitle, location).subscribe({
      next: (data) => {
        console.log('Search results:', data);

        // Clear job title and location after search
        this.searchForm.reset(); // Reset the form

        // Clear old jobs and assign new results
        this.jobs = data;
        this.isModalOpen = true; // Open the modal
      },
      error: (err) => {
        this.modalService.showModal(this.viewContainerRef, "Error", "Error searching jobs", ['OK'])

        // Optionally handle error (e.g., show a notification)
      },
      complete: () => {
        this.isLoading = false; // Stop loading state
      }
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    // Optionally clear jobs when closing the modal
    this.jobs = []; // Clear jobs when modal is closed if desired
  }
}
