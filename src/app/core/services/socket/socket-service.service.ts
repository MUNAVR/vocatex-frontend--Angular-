import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../../../models/chat';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService implements OnDestroy {
  private socket: Socket | null = null;

  constructor(private http: HttpClient) {
    console.log("constructure is working")
    const token = this.getToken();
    
    if (token) {
      this.socket = io(`${environment.socketUrl}?token=${token}`, {
        transports: ['websocket']
      })
    } else {
      console.error('Token not found');
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Socket connection closed');
    }
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders().set('Content-Type', 'application/json'); 

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  sendMessage(message: ChatMessage): Observable<ChatMessage> {
    console.log(message.receiver_id);
    const headers = this.getAuthHeaders();
    return this.http.post<ChatMessage>(`${environment.apiUrl}/send_messages`, message, { headers });
  }

  getMessages(receiverId: string): Observable<ChatMessage[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<ChatMessage[]>(`${environment.apiUrl}/${receiverId}`, { headers });
  }

  onMessageReceived(): Observable<ChatMessage> {
    return new Observable<ChatMessage>(observer => {
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
