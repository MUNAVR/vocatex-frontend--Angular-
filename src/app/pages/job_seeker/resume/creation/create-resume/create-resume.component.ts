import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateResumeService } from '../../../../../core/services/job_seeker/resume/create_resume/create-resume.service';
import { ModalService } from '../../../../../shared/model/modal.service';
import { ResumeDetailsResponse } from '../../../../../models/resumeModels';
import { Design1Component } from '../../design/design1/design1.component';
import { Design2Component } from '../../design/design2/design2.component';
import { Design3Component } from '../../design/design3/design3.component';
import { Router } from '@angular/router';
import { LoginserviceService } from '../../../../../core/services/job_seeker/auth/login/loginservice.service';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-create-resume',
  standalone: true,
  imports: [FormsModule, CommonModule, Design1Component, Design2Component, Design3Component],
  templateUrl: './create-resume.component.html',
  styleUrls: ['./create-resume.component.css']
})
export class CreateResumeComponent {

  public resumeData: ResumeDetailsResponse | null = null;
  selectedDesign: string = ''; // To store the selected design identifier
  isDesignSelected: boolean = false; // Flag for design selection state
  


  Design1Component = Design1Component;
  Design2Component = Design2Component;
  Design3Component = Design3Component;

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  @ViewChild('resumeContainer', { static: true }) resumeContainer!: ElementRef;  // Refers to the parent div

  constructor(
    private resumeService: CreateResumeService,
    private modalService: ModalService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private loginService:LoginserviceService
  ) {}
  

  // Set the selected design ID
  selectDesign(design: string) {
    this.selectedDesign = design;
    this.isDesignSelected = true;
  }

  // Dynamically load the selected component
  loadComponent(component: any) {
    this.container.clear(); // Clear the container
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.container.createComponent(componentFactory); // Dynamically create the component
  }

  // Navigate to the selected design page
  goToSelectedDesign() {
    const validDesigns = ['design1', 'design2', 'design3'];
  
    if (validDesigns.includes(this.selectedDesign)) {
      this.router.navigate([`/resume/${this.selectedDesign.toLowerCase()}`]);
    } else {
      console.error('Invalid design selected');
    }
  }

  logout(): void {
    this.loginService.logout();  // Call logout service
    this.router.navigate(['job_index']);  // Redirect to the job index page
  }

  downloadResume1() {
    const resumeHTML = this.resumeContainer.nativeElement.innerHTML;  // Access the container's inner HTML
    
    // Create a downloadable blob
    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.selectedDesign}_resume.html`;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  }




  openDownloadOptions() {
    // You can show a modal here for the options (PDF or Excel)
    // For simplicity, let's assume we have a div that acts as a modal
    document.getElementById('downloadModal')?.classList.remove('hidden');
  }

  // Hide the download modal
  closeDownloadModal() {
    document.getElementById('downloadModal')?.classList.add('hidden');
  }

  // Trigger the download based on the user's selection (PDF or Excel)
  downloadResume(type: 'pdf' | 'excel') {
    if (type === 'pdf') {
      this.downloadPDF();
    } else if (type === 'excel') {
      this.downloadExcel();
    }
    this.closeDownloadModal(); // Close the modal after the download
  }

  // Function to download as PDF (already implemented)
  downloadPDF() {
    const options = {
      margin: 1,
      filename: `${this.selectedDesign}_resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const element = this.resumeContainer.nativeElement;
    html2pdf().from(element).set(options).save();
  }

  downloadExcel() {
    const resumeHTML = this.resumeContainer.nativeElement.innerHTML;

    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.resumeContainer.nativeElement);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Resume');

    XLSX.writeFile(workbook, `${this.selectedDesign}_resume.xlsx`);
  }
  
}
  
  

