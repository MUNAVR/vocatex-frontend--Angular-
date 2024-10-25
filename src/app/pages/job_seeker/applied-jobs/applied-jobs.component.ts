import { Component, ViewContainerRef } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AppliedJobResponse } from '../../../models/applyModel';
import { ApplyService } from '../../../core/services/job_seeker/apply/apply.service';
import { ModalService } from '../../../shared/model/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [RouterLink,RouterModule,CommonModule,FormsModule],
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.css'
})
export class AppliedJobsComponent {
  appliedJobs: AppliedJobResponse[] = [];

  constructor(
    private applyService: ApplyService,
    private modalService:ModalService,
    private viewContainerRef: ViewContainerRef,
    private router:Router
  ){
    this.loadAppliedJobs()
  }

  loadAppliedJobs(): void {
    this.applyService.getAppliedJobs().subscribe({
      next: (data) => {
        this.appliedJobs = data; 
      },
      error: (err) => {
        this.modalService.showModal(this.viewContainerRef, "Error", "Failed to load applied jobs.", ['OK']);
      }
    });
  }
}
