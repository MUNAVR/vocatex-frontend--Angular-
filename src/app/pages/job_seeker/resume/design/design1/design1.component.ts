import { Component, Input, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateResumeService } from '../../../../../core/services/job_seeker/resume/create_resume/create-resume.service';
import { ModalService } from '../../../../../shared/model/modal.service';
import { ResumeDetailsResponse } from '../../../../../models/resumeModels';

@Component({
  selector: 'app-design1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './design1.component.html',
  styleUrls: ['./design1.component.css'], // Fixed typo "styleUrl" to "styleUrls"
})
export class Design1Component {
  public resumeData: ResumeDetailsResponse | null = null;

  constructor(
    private resumeService: CreateResumeService,
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef

  ) {
    this.get_your_resume()
  }

  get_your_resume(): void {
    this.resumeService.getResume().subscribe(
      (data: any) => {
        console.log(data)
        this.resumeData = data;
        console.log('Resume data fetched successfully:', this.resumeData);
      },
      (error) => {
        this.modalService.showModal(
          this.viewContainerRef,
          'Error',
          'Failed to fetch resume data.',
          ['OK']
        );
        console.error('Error fetching resume data:', error);
      }
    );
  }
  
}
  