import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { ChatMessage } from '../../../models/chat';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SocketServiceService implements OnDestroy {
  private websocket!: WebSocket;
  private messageSubject = new ReplaySubject<any>(10);// Replay the latest message

  constructor(private http: HttpClient) {
    this.connectWebSocket();
  }

  private connectWebSocket(): void {
    const user_id = this.getUserId();
    if (!user_id) {
      console.error('User ID not found');
      return;
    }

    this.websocket = new WebSocket(`ws://localhost:8000/ws/chat/${user_id}`);

    this.websocket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.websocket.onclose = () => {
      console.log('WebSocket disconnected, attempting to reconnect...');
      setTimeout(() => this.connectWebSocket(), 3000); // Reconnect after 5 seconds
    };

    this.websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.websocket.onmessage = (event) => {
      try {
        console.log("Message received from WebSocket:", event.data);
        const message = JSON.parse(event.data);
        this.messageSubject.next(message);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  private getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  disconnect(): void {
    if (this.websocket) {
      this.websocket.close();
    }
  }

  sendMessage(message: ChatMessage): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Message not sent.');
    }
  }

  getMessages(receiverId: string, senderId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`http://localhost:8000/api/V1/messages/${receiverId}?sender_id=${senderId}`);
  }

  onMessageReceived(): Observable<any> {
    return this.messageSubject.asObservable().pipe(shareReplay(1)); // Replay the last message
  }
}
