import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeekerLoginComponent } from '../../pages/job_seeker/ath/login/login.component';

@Component({
  selector: 'app-search-result-modal',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,SeekerLoginComponent],
  templateUrl: './search-result-modal.component.html',
  styleUrl: './search-result-modal.component.css'
})
export class SearchResultModalComponent {
  @Input() jobs: any[] = [];
  @Input() isOpen: boolean = false;

  constructor(){
    console.log(this.jobs)
  }

  closeModal() {
    this.isOpen = false;
  }
}
