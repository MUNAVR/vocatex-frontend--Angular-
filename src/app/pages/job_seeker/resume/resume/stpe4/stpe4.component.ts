import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ResumeStepService } from '../../service/stephandilService';
import { CommonModule } from '@angular/common';

function dateRangeValidator(): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const startDate = formGroup.get('start_date')?.value;
    const endDate = formGroup.get('end_date')?.value;

    // Check if both dates are valid and the end date is after the start date
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return { invalidDateRange: true }; // Return error if invalid
    }
    return null; // Return null if valid
  };
}

@Component({
  selector: 'app-stpe4',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './stpe4.component.html',
  styleUrl: './stpe4.component.css'
})
export class Stpe4Component {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router,private stephandleService:ResumeStepService) {
    const savedData = this.stephandleService.getStepData(4);
    this.projectForm = this.fb.group({
      project_name: [savedData?.project_name || '', Validators.required],
      description: [savedData?.description || '', Validators.required],
      technology_used: [savedData?.technology_used || '', Validators.required],
      role: [savedData?.role || '', Validators.required],
      start_date: [savedData?.start_date || '', Validators.required],
      end_date: [savedData?.end_date || '', Validators.required]
    }, 
    { validators: dateRangeValidator() 
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.stephandleService.saveStepData(4,this.projectForm.value);
      this.router.navigate(['step5'])
    }
  }
}
