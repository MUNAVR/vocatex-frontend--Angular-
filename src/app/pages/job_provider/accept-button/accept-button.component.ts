import { Component, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { ApplicationService } from '../../../core/services/job_provider/applications/application.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../shared/model/modal.service';

@Component({
  selector: 'app-accept-button',
  standalone: true,
  imports: [],
  templateUrl: './accept-button.component.html',
  styleUrl: './accept-button.component.css'
})
export class AcceptButtonComponent {

  @Input() applicationId!: string; 
  @Output() applicationAccepted = new EventEmitter<void>();

  constructor(
    private ApplicationService:ApplicationService,
    private router:Router,
    private modalService:ModalService,
    private viewContainerRef: ViewContainerRef
  ){}

  onAccept() {
    console.log(this.applicationId)
    this.ApplicationService.acceptApplication(this.applicationId).subscribe(
      () => {
        this.modalService.showModal(this.viewContainerRef, "Success", "Accepted Successfully!", ['OK'])
          .then((result) => {
            if (result === undefined) {
              // location.reload();
              this.applicationAccepted.emit();
            }
          });
        console.log(`Application with ID ${this.applicationId} accepted.`);
      },
      (error) => {
        console.error("Error accepting application:", error);
      }
    );
  }

}
