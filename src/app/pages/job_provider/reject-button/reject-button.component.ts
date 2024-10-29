import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reject-button',
  standalone: true,
  templateUrl: './reject-button.component.html',
  styleUrls: ['./reject-button.component.css']
})
export class RejectButtonComponent {
  @Output() reject = new EventEmitter<void>();

  onReject() {
    this.reject.emit();
  }
}
