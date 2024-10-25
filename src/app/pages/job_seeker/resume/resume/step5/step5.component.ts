import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeStepService } from '../../service/stephandilService';

@Component({
  selector: 'app-step5',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './step5.component.html',
  styleUrl: './step5.component.css'
})
export class Step5Component {
  educationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private stephandleService:ResumeStepService) {
    const savedData = this.stephandleService.getStepData(5);
    this.educationForm = this.fb.group({
      institution_name: [savedData?.institution_name || '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      degree: [savedData?.degree || '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      field_of_study: [savedData?.field_of_study || '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      start_date: [savedData?.start_date || '', [
        Validators.required,
        this.dateValidator('end_date', 'start_date')
      ]],
      end_date: [savedData?.end_date || '', [
        Validators.required,
        this.dateValidator('start_date', 'end_date')
      ]]
    });
  }


  dateValidator(startDateField: string, endDateField: string) {
    return (formGroup: FormGroup) => {
      const startDate = formGroup.get(startDateField)?.value;
      const endDate = formGroup.get(endDateField)?.value;
  
      if (startDate && endDate && startDate > endDate) {
        return { dateMismatch: true };
      }
  
      return null;
    };
  }
  

  onSubmit(): void {
    if (this.educationForm.valid) {
      this.stephandleService.saveStepData(5,this.educationForm.value);
      this.router.navigate(['step6'])
    }
  }
}
