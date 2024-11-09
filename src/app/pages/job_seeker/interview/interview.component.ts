import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { WebRTCService } from '../../../core/services/webrtc/webrtc.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interview-seeker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponentSeeker implements OnInit {
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;
  @Input() receiverId: string = '';

  callIncoming: boolean = false;
  private receivedOffer: RTCSessionDescriptionInit | null = null;

  constructor(private webrtcService: WebRTCService) {}

  async ngOnInit() {
    const localStream = await this.webrtcService.initLocalStream();
    this.localVideo.nativeElement.srcObject = localStream;

    this.webrtcService.offerReceived$.subscribe((offer) => {
      if (offer) {
        this.receivedOffer = offer;
        this.callIncoming = true;
      }
    });
  }

  async acceptCall() {
    if (this.receivedOffer && this.receiverId) {
      await this.webrtcService.createAnswer(this.receivedOffer, this.receiverId);
      this.displayRemoteStream();
      this.callIncoming = false;
    }
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









