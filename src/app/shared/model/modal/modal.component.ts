import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule], // Include CommonModule for ngIf and other common directives
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() buttons: string[] = ['OK'];

  @Output() closeEvent = new EventEmitter<void>();

  visible: boolean = true;

  close() {
    this.visible = false;
    this.closeEvent.emit();
  }
}
