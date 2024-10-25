import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResumeStepService {
  private resumeData: any = {
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    step5: null,
    step6: null,
  };

  private currentStepSubject = new BehaviorSubject<number>(1);
  currentStep$ = this.currentStepSubject.asObservable();

  // Save data for a specific step
  saveStepData(step: number, data: any) {
    this.resumeData[`step${step}`] = data;
  }

  // Get data for a specific step
  getStepData(step: number) {
    return this.resumeData[`step${step}`];
  }

  // Set current step
  setCurrentStep(step: number) {
    this.currentStepSubject.next(step);
  }

  // Check if all steps are completed
  isAllStepsCompleted(): boolean {
    return Object.values(this.resumeData).every((data) => data !== null);
  }

  // Get all data
  getAllData() {
    return this.resumeData;
  }
}
