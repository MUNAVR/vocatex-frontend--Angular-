import { Component, ViewContainerRef } from '@angular/core';
import { ResumeDetailsResponse } from '../../../../../models/resumeModels';
import { CreateResumeService } from '../../../../../core/services/job_seeker/resume/create_resume/create-resume.service';
import { ModalService } from '../../../../../shared/model/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-design2',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './design2.component.html',
  styleUrls: ['./design2.component.css'],
})
export class Design2Component {
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
