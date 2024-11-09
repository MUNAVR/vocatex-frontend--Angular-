import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { WebRTCService } from '../../../core/services/webrtc/webrtc.service';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.css'
})
export class InterviewComponent implements OnInit {
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;
  @Input() receiverId: string = '';

  constructor(private webrtcService: WebRTCService) {}

  async ngOnInit() {
    // Initialize local stream and display it
    const localStream = await this.webrtcService.initLocalStream();
    this.localVideo.nativeElement.srcObject = localStream;

    // Subscribe to the remote stream observable to display the seeker's video
    this.webrtcService.remoteStream$.subscribe((remoteStream) => {
      if (remoteStream) {
        this.remoteVideo.nativeElement.srcObject = remoteStream;
      }
    });
  }

  async startCall() {
    await this.webrtcService.createOffer(this.receiverId);
  }

  displayRemoteStream() {
    const remoteStream = this.webrtcService.getRemoteStream();
    if (remoteStream) {
      this.remoteVideo.nativeElement.srcObject = remoteStream;
    }
  }

  hangUpCall() {
    this.webrtcService.closeConnection();
    this.localVideo.nativeElement.srcObject = null;
    this.remoteVideo.nativeElement.srcObject = null;
  }
}
