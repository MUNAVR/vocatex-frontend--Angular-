import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebRTCService implements OnDestroy {
  private webrtcSocket!: WebSocket;
  private peerConnection: RTCPeerConnection | null = null;
  public offerReceived$ = new BehaviorSubject<RTCSessionDescriptionInit | null>(null);
  public candidateReceived$ = new BehaviorSubject<RTCIceCandidate | null>(null);
  private remoteStreamSubject = new BehaviorSubject<MediaStream | null>(null);

  constructor() {
    this.connectWebRTCWebSocket();
  }

  private connectWebRTCWebSocket(): void {
    const userId = this.getUser();
    if (!userId) {
      console.error('User ID not found for WebRTC');
      return;
    }

    this.webrtcSocket = new WebSocket(`wss://api.vocatex.site/ws/webrtc/${userId}`);
    this.webrtcSocket.onopen = () => console.log('WebRTC WebSocket connected');
    this.webrtcSocket.onclose = () => setTimeout(() => this.connectWebRTCWebSocket(), 3000);
    this.webrtcSocket.onerror = (error) => console.error('WebRTC WebSocket error:', error);

    this.webrtcSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'webrtc-offer') {
        this.offerReceived$.next(data.offer);
      } else if (data.type === 'webrtc-answer') {
        this.peerConnection?.setRemoteDescription(new RTCSessionDescription(data.answer));
      } else if (data.type === 'webrtc-ice-candidate') {
        this.candidateReceived$.next(new RTCIceCandidate(data.candidate));
      }
    };
  }

  async initLocalStream(): Promise<MediaStream> {
    await this.createPeerConnection();
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.getTracks().forEach(track => this.peerConnection?.addTrack(track, localStream));
    return localStream;
  }

  closeConnection() {
    // Stop all tracks on local stream
    const localStream = this.remoteStreamSubject.value;
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
  
    // Close peer connection
    if (this.peerConnection) {
      this.peerConnection.onicecandidate = null; // Remove event listeners
      this.peerConnection.ontrack = null;
      this.peerConnection.close();
      this.peerConnection = null;
    }
  
    // Clear the remote stream to stop displaying it
    this.remoteStreamSubject.next(null);
  }

  async createOffer(receiverId: string): Promise<void> {
    await this.createPeerConnection();
    const offer = await this.peerConnection!.createOffer();
    await this.peerConnection!.setLocalDescription(offer);
    this.sendSignalingMessage({ type: 'webrtc-offer', offer, receiver_id: receiverId });
  }

  async createAnswer(offer: RTCSessionDescriptionInit, receiverId: string): Promise<void> {
    await this.createPeerConnection();
    await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection!.createAnswer();
    await this.peerConnection!.setLocalDescription(answer);
    this.sendSignalingMessage({ type: 'webrtc-answer', answer, receiver_id: receiverId });
  }

  async createPeerConnection(): Promise<void> {
    if (this.peerConnection) return;
    this.peerConnection = new RTCPeerConnection();
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignalingMessage({ type: 'webrtc-ice-candidate', candidate: event.candidate });
      }
    };
    this.peerConnection.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        const remoteStream = event.streams[0];
        this.remoteStreamSubject.next(remoteStream);
      }
    };
  }

  getRemoteStream(): MediaStream | null {
    return this.remoteStreamSubject.value;
  }

  get remoteStream$(): Observable<MediaStream | null> {
    return this.remoteStreamSubject.asObservable();
  }

  private sendSignalingMessage(data: any): void {
    if (this.webrtcSocket?.readyState === WebSocket.OPEN) {
      this.webrtcSocket.send(JSON.stringify(data));
    }
  }

  ngOnDestroy(): void {
    this.webrtcSocket?.close();
    this.peerConnection?.close();
  }

  private getUser(): string | null {
    return localStorage.getItem('user_id');
  }

  public addIceCandidate(candidate: RTCIceCandidate): void {
    if (this.peerConnection) {
      this.peerConnection.addIceCandidate(candidate)
        .catch(error => console.error('Error adding ICE candidate:', error));
    }
  }
}
