import { CommonModule } from '@angular/common';
import { Component ,ViewContainerRef} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HomeComponent } from '../../home/home/home.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateJobService } from '../../../../core/services/job_provider/jobs/create-job.service';
import { ModalService } from '../../../../shared/model/modal.service';


@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [CommonModule,RouterLink,HomeComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent {
  createForm: FormGroup;

  constructor(private fb: FormBuilder,
    private createService: CreateJobService,
    private router:Router,
    private modalService:ModalService,
    private viewContainerRef: ViewContainerRef
  
  
  ) {
    this.createForm = this.fb.group({
      jobTitle: ['', [Validators.required, Validators.minLength(3)]],
      jobLocation: ['', [Validators.required]],
      salaryFrom: ['', [Validators.required, Validators.min(0)]],
      salaryTo: ['', [Validators.required, Validators.min(0)]],
      jobType: ['', Validators.required],
      jobMode: ['', Validators.required],
      experience: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      skillsAndRequirements: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Submit the form
  onSubmit() {
    if (this.createForm.valid) {
      // Collecting form data
      const formData = {
        title: this.createForm.get('jobTitle')?.value,
        job_location: this.createForm.get('jobLocation')?.value,
        salary_from: this.createForm.get('salaryFrom')?.value,
        salary_to: this.createForm.get('salaryTo')?.value,
        job_type: this.createForm.get('jobType')?.value,
        job_mode: this.createForm.get('jobMode')?.value,
        experience: this.createForm.get('experience')?.value,
        description: this.createForm.get('description')?.value,
        skills_and_requirements: this.createForm.get('skillsAndRequirements')?.value
      };

      // Passing the data to your service
      console.log(formData)
      this.createService.createJobService(formData).subscribe({
        next: (res) => {
          this.modalService.showModal(this.viewContainerRef, "Success", "Job Created Successfully!", ['OK']);
          this.createForm.reset(); 
          this.router.navigate(['job_provider_home']); 
        },
        error: (err) => {
          console.error(err);
          this.modalService.showModal(this.viewContainerRef, "Error", "An error occurred while creating the job.", ['OK']);
        }
      });
    } else {
      this.modalService.showModal(this.viewContainerRef, "Error", "Please fill in all required fields correctly.", ['OK'])
    }
  }
}

