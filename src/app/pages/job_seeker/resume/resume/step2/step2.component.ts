import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeStepService } from '../../service/stephandilService';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})
export class Step2Component {
  addressForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private stephandleService:ResumeStepService ) {
    const savedData = this.stephandleService.getStepData(2);  
    this.addressForm = this.fb.group({
      street: [savedData?.street || '', [Validators.required, Validators.minLength(2)]],
      city: [savedData?.city || '', [Validators.required, Validators.minLength(2)]],
      state: [savedData?.state || '', [Validators.required, Validators.minLength(2)]],
      postal_code: [savedData?.postal_code || '', [Validators.required, Validators.pattern(/^\d{5,6}$/)]], // validates 5-6 digit postal code
      country: [savedData?.country || '', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      console.log(this.addressForm.valid)
      this.stephandleService.saveStepData(2,this.addressForm.value);
      this.router.navigate(['step3'])
    }
  }

}
