import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { LoginserviceService } from '../../../core/services/job_seeker/auth/login/loginservice.service';
import { ApplyService } from '../../../core/services/job_seeker/apply/apply.service';
import { user_basic_details } from '../../../models/jobDetails';
import { create_application, job_comapany_details } from '../../../models/applyModel';
import { UUID } from 'crypto';
import { ModalService } from '../../../shared/model/modal.service';
import { SeekerHomeComponent } from '../home/home/home.component';

@Component({
  selector: 'app-job-apply',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,RouterLink,SeekerHomeComponent],
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.css']
})
export class JobApplyComponent implements OnInit {
  job_id
  selectedFile: File | null = null;
  userDetails: user_basic_details | null = null;
  job_details:job_comapany_details | null =null;
  data: create_application | null =null;

  constructor(
    private route: ActivatedRoute,
    private loginservice: LoginserviceService,
    private applyService: ApplyService,
    private modalService:ModalService,
    private viewContainerRef: ViewContainerRef,
    private router:Router
  ) {
    this.job_id = this.route.snapshot.paramMap.get('job_id') || '';
  }

  ngOnInit(): void {
    this.get_user_details();
    this.get_job_details() ;
  }

  // Fetch user details and store them in userDetails
  get_user_details(): void {
    this.applyService.user_detials().subscribe(
      (data: user_basic_details) => {
        this.userDetails = data; // Set user details
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  get_job_details(): void {
    this.applyService.getJobDetails(this.job_id).subscribe(
      (data) => {
        console.log("here")
        this.job_details = data; // Set job details
      },
      (error) => {
        console.error('Error fetching job details:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  logout(): void {
    this.loginservice.logout();
    this.router.navigate(['job_index']);
  }

  onSubmit(): void {
    if (this.selectedFile && this.job_id) {
      this.applyService.createJobApplication(this.job_id, this.selectedFile).subscribe(
        (response) => {
          console.log('Application submitted successfully', response);
          
          // Show success modal with OK button, and on OK click, navigate to jobs page
          this.modalService.showModal(this.viewContainerRef, "Success", "Job application submitted successfully!", ['OK'])
            .then((result) => {
              console.log("resule",result)
              if (result === undefined) {
                this.router.navigate(['job_seeker_home']);  // Navigate to jobs page after OK click
              }
            });
        },
        (error) => {
          console.error('Error submitting the application', error);
          this.modalService.showModal(this.viewContainerRef, "Error", "Failed to submit the application", ['OK']);
        }
      );
    } else {
      this.modalService.showModal(this.viewContainerRef, "Error", "Please select a file and enter a job ID", ['OK']);
    }
  }
}

  
