// provider-chat.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { SocketServiceService } from '../../../core/services/socket/socket-service.service';
import { ChatMessage } from '../../../models/chat';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-provider-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './provider-chat.component.html',
  styleUrls: ['./provider-chat.component.css']
})
export class ProviderChatComponent implements OnInit {
  @Input() receiverId: string = '';
  messages: ChatMessage[] = [];
  newMessage: string = '';
  user_id: string | null = null;

  constructor(private chatService: SocketServiceService) {}

  private getUserId(): string | null {
    return localStorage.getItem('user_id');
  }


  ngOnInit(): void {
    this.user_id = this.getUserId(); // Fetch the user ID when the component initializes

    if (this.user_id) { // Check if user_id is not null
      this.chatService.getMessages(this.receiverId, this.user_id).subscribe((fetchedMessages) => {
        this.messages = fetchedMessages;
      }, error => {
        console.error('Error fetching messages:', error); // Handle error
      });

      this.chatService.onMessageReceived().subscribe((message: ChatMessage) => {
        this.messages.push(message);
      });
    } else {
      console.error('User ID not found');
    }
  }


  sendMessage(): void {

    if (!this.user_id) {
      console.error('User ID not found');
      return; // Prevent sending if user_id is null
    }

    const message: ChatMessage = {
      sender_id: this.user_id, // Corrected
      content: this.newMessage,
      receiver_id: this.receiverId,
    };
    this.chatService.sendMessage(message);
    this.messages.push(message); 
    this.newMessage = ''; 
  }

}
