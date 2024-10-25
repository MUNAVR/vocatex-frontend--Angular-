import { CommonModule } from '@angular/common';
import { Component,ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HomeComponent } from '../../home/home/home.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditJobService } from '../../../../core/services/job_provider/jobs/edit_job/edit-job.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../../shared/model/modal.service';


@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink,HomeComponent],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css'
})
export class EditJobComponent {

  createForm: FormGroup;
  job_id: string = '';

  constructor(private fb: FormBuilder,private router:Router,
     private editJobService:EditJobService,
     private route: ActivatedRoute,
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

    this.job_id = this.route.snapshot.paramMap.get('job_id') || '';
  }

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
      
      this.editJobService.editJobService(this.job_id,formData).subscribe({
        next: (res) => {
          this.modalService.showModal(this.viewContainerRef, "Success", "Job Edited Successfully!", ['OK']);
          this.createForm.reset(); // Reset the form on success
          this.router.navigate(['job_provider_home']); // Navigate to some page
        },
        error: (err) => {
          console.error(err);
          this.modalService.showModal(this.viewContainerRef, "Error", "An error occurred while creating the job.", ['OK']);
        }
      });
    } else {
      this.modalService.showModal(this.viewContainerRef, "Error", "Please fill in all required fields correctly.", ['OK']);
    }
  }

}
