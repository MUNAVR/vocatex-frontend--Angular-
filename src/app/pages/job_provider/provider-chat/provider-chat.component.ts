import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketServiceService } from '../../../core/services/socket/socket-service.service';
import { ChatMessage } from '../../../models/chat';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-provider-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './provider-chat.component.html',
  styleUrls: ['./provider-chat.component.css']
})
export class ProviderChatComponent implements OnInit, OnDestroy {
  @Input() receiverId: string = '';
  messages: any[] = [];
  newMessage: string = '';
  user_id: string | null = null;
  private messageSubscription!: Subscription;

  constructor(private chatService: SocketServiceService) {}

  private getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  ngOnInit(): void {
    this.user_id = this.getUserId();
    if (this.user_id) {
      this.chatService.getMessages(this.receiverId, this.user_id).subscribe(
        (fetchedMessages) => {
          this.messages = fetchedMessages;
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
  
      // Subscribe to onMessageReceived and handle incoming messages in real-time
      this.messageSubscription = this.chatService.onMessageReceived().subscribe(
        (message) => {
            console.log(message)
            // Display the message if it's either sent by or received by the current user
            if(message.receiver_id === this.user_id && message.sender_id === this.receiverId) {
                this.messages.push(message);
            }
        },
        (error) => {
            console.error("Error receiving messages:", error);
        }
    );    
    } else {
      console.error('User ID not found');
    }
  }
  

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  sendMessage(): void {
    if (!this.user_id) {
      console.error('User ID not found');
      return;
    }

    const message: ChatMessage = {
      sender_id: this.user_id,
      content: this.newMessage,
      receiver_id: this.receiverId,
    };

    console.log('Sending message:', message);
    this.chatService.sendMessage(message);

    // Add the sent message to the UI immediately without waiting for a response
    this.messages.push(message);
    this.newMessage = ''; // Clear the input
  }
}
