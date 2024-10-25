import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeDetailsResponse } from '../../../../models/resumeModels';
import { CreateResumeService } from '../../../../core/services/job_seeker/resume/create_resume/create-resume.service';
import { ModalService } from '../../../../shared/model/modal.service';
import { Design1Component } from '../design/design1/design1.component';
import { LoginserviceService } from '../../../../core/services/job_seeker/auth/login/loginservice.service';
import { SeekerHomeComponent } from '../../home/home/home.component';


@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [RouterLink,RouterModule,Step1Component,CommonModule,FormsModule,Design1Component,SeekerHomeComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  public resume: ResumeDetailsResponse | null = null;
  resumeId: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resumeService:CreateResumeService,
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private loginService:LoginserviceService
  ) {}
  

  navigateToStep1() {
    this.router.navigate(['resume_step1'], { relativeTo: this.route });
  }

  get_your_resume(): void {
    console.log("Button clicked, fetching resume...");
    
    this.resumeService.getResume().subscribe(
      (data: any) => {
        this.resume = data;
        
        // Show success modal
        this.modalService.showModal(this.viewContainerRef, "Success", "Resume data fetched successfully!", ['OK']);
        console.log('Resume data fetched successfully:', this.resume);
      },
      (error) => {
        // Show error modal
        this.modalService.showModal(this.viewContainerRef, "Error", "Failed to fetch resume data.", ['OK']);
        console.error('Error fetching resume data:', error);
      }
    );
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['job_index'])
  }

}
