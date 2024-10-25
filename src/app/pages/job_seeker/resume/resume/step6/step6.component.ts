import { CommonModule } from '@angular/common';
import { Component ,ViewContainerRef} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeStepService } from '../../service/stephandilService';
import { CreateResumeService } from '../../../../../core/services/job_seeker/resume/create_resume/create-resume.service';
import { ModalService } from '../../../../../shared/model/modal.service'; 


function durationValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    const valid = /^(\d+)\s*(months?|years?)$/i.test(value);
    return valid ? null : { invalidDuration: true };
  };
}


@Component({
  selector: 'app-step6',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './step6.component.html',
  styleUrl: './step6.component.css'
})
export class Step6Component {
  experienceForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private router: Router, 
     private stephandleService:ResumeStepService,
     private Serviceapi:CreateResumeService,
     private modalService:ModalService,
     private viewContainerRef: ViewContainerRef
    
    
    ) {
    const savedData = this.stephandleService.getStepData(6);
    this.experienceForm = this.fb.group({
      company_name: [savedData?.company_name || '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      duration: [savedData?.duration || '', [
        Validators.required,
        durationValidator()  // Use the custom validator here
      ]],
      position: [savedData?.position || '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      place: [savedData?.place || '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]]
    });
  }

  

  onSubmit(): void {
    if (this.experienceForm.valid) {
      this.stephandleService.saveStepData(6,this.experienceForm.value); 
    }
    
    const resumeData = this.stephandleService.getAllData();
    console.log(resumeData)
     // Check if all steps are filled before sending the data
    if (this.stephandleService.isAllStepsCompleted()) {
      // Send data to backend step by step
      this.sendDataToBackend(resumeData);
    } else {
      this.modalService.showModal(this.viewContainerRef, "Error", "Please complete all steps before submission.l", ['OK'])
    }
    this.modalService.showModal(this.viewContainerRef, "Success", "Resume Created Successful", ['OK'])

    this.router.navigate(['/resume_home'])


  }

  sendDataToBackend(resumeData: any): void {
    const resumeStepService = this.Serviceapi;
    const formattedData = {
      personalinfp: [{
        first_name: resumeData.step1.first_name,
        last_name: resumeData.step1.last_name,
        position: resumeData.step1.position,
        about: resumeData.step1.about
      }], 
      address: [resumeData.step2],
      skills: [resumeData.step3],
      projects: [resumeData.step4],
      educations: [resumeData.step5],
      experiences: [resumeData.step6]
    };
  
    // Step 1: Personal Info
    resumeStepService.createPersonalInfo({personalinfp: formattedData.personalinfp}).subscribe({
      next: (personalInfoResponse) => {
        const resumeId = personalInfoResponse.resume_id;
        console.log(resumeId)
  
        // Step 2: Address
        resumeStepService.addAddress(resumeId,{address:formattedData.address}).subscribe({
          next: () => {
            // Step 3: Skills
            resumeStepService.addSkills(resumeId, {skills:formattedData.skills}).subscribe({
              next: () => {
                // Step 4: Projects
                resumeStepService.addProjects(resumeId, {projects:formattedData.projects}).subscribe({
                  next: () => {
                    // Step 5: Education
                    resumeStepService.addEducation(resumeId, {educations:formattedData.educations}).subscribe({
                      next: () => {
                        // Step 6: Experience
                        resumeStepService.addExperience(resumeId, {experiences:formattedData.experiences}).subscribe({
                          next: () => {
                            this.modalService.showModal(this.viewContainerRef, "Success", "All steps submitted successfully!", ['OK'])
                            console.log('All steps submitted successfully!');
                          },
                          error: (err) => {
                            this.modalService.showModal(this.viewContainerRef, "Error", "Error submitting experience:", ['OK'])
                            console.error('Error submitting experience:', err);
                          }
                        });
                      },
                      error: (err) => {
                        this.modalService.showModal(this.viewContainerRef, "Error", "Error submitting education:", ['OK'])
                        console.error('Error submitting education:', err);
                      }
                    });
                  },
                  error: (err) => {
                    this.modalService.showModal(this.viewContainerRef, "Error", "Error submitting projects:", ['OK'])
                    console.error('Error submitting projects:', err);
                  }
                });
              },
              error: (err) => {
                this.modalService.showModal(this.viewContainerRef, "Error", "Error submitting skills:", ['OK'])
                console.error('Error submitting skills:', err);
              }
            });
          },
          error: (err) => {
            this.modalService.showModal(this.viewContainerRef, "Error", "Error submitting address:", ['OK'])
            console.error('Error submitting address:', err);
          }
        });
      },
      error: (err) => {
        this.modalService.showModal(this.viewContainerRef, "Error", "Error submitting personal info:", ['OK'])
        console.error('Error submitting personal info:', err);
      }
    });
  }

}
