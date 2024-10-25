import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeStepService } from '../../service/stephandilService';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css'
})
export class Step3Component {
  skillsForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private stephandleService:ResumeStepService) {
    const savedData = this.stephandleService.getStepData(3); 
    this.skillsForm = this.fb.group({
      title: [savedData?.title || '', [Validators.required, Validators.minLength(3)]],
      soft_skill: [savedData?.soft_skill || '', [Validators.required, Validators.minLength(3)]],
      communication_skill: [savedData?.communication_skill || '', [Validators.required, Validators.minLength(3)]],
      other_skills: [savedData?.other_skills || '', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.skillsForm.valid) {
      this.stephandleService.saveStepData(3,this.skillsForm.value); 
      this.router.navigate(['step4'])
    }
  }
}
