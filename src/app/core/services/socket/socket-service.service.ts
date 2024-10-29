// socket-service.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environment/environment';
import { ChatMessage } from '../../../models/chat';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService implements OnDestroy {
  private socket!: Socket;

  constructor(private http: HttpClient) {
    this.connectSocket();
  }

  private connectSocket(): void {
    const token = this.getToken();
    this.socket = io(`${environment.socketUrl}/ws`, {
      auth: { token },
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Socket disconnected');
    }
  }

  sendMessage(message: ChatMessage): void {
    if (this.socket) {
      this.socket.emit('message', message);
    }
  }

  getMessages(receiverId: string, sender_id: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${environment.apiUrl}/messages/${receiverId}?sender_id=${sender_id}`, {
      headers: this.getAuthHeaders()
    });
  }

  onMessageReceived(): Observable<ChatMessage> {
    return new Observable(observer => {
      if (this.socket) {
        this.socket.on('chat_message', (data: ChatMessage) => {
          observer.next(data);
        });
      } else {
        console.error('Socket connection not initialized');
      }
    });
  }
}