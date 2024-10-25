import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeStepService } from '../../service/stephandilService';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component  {

  personalInfoForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private stephandleService:ResumeStepService) {
    const savedData = this.stephandleService.getStepData(1);
    this.personalInfoForm = this.fb.group({
      first_name: [savedData?.first_name || '', [Validators.required, Validators.minLength(2)]],
      last_name: [savedData?.last_name || '', [Validators.required, Validators.minLength(2)]],
      position: [savedData?.position || '', [Validators.required, Validators.minLength(5), this.noDigitsValidator]],
      about: [savedData?.about || '', [Validators.required, this.minWordsValidator(10)]]
    });
  }

  noDigitsValidator(control: FormControl) {
    const regex = /^[^\d]*$/;
    return regex.test(control.value) ? null : { hasDigits: true };
  }

  // Custom Validator: Minimum Number of Words
  minWordsValidator(minWords: number) {
    return (control: FormControl) => {
      if (!control.value) return null;
      const wordCount = control.value.trim().split(/\s+/).length;
      return wordCount >= minWords ? null : { wordCount: true };
    };
  }


  onSubmit(): void {
    if (this.personalInfoForm.valid) {
      console.log(this.personalInfoForm.value)
      this.stephandleService.saveStepData(1,this.personalInfoForm.value);
      this.router.navigate(['step2'])
    }
  }

}
