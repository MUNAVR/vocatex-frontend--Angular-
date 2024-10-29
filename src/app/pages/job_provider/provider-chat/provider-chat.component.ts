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
  styleUrl: './provider-chat.component.css'
})
export class ProviderChatComponent implements OnInit {
  @Input() receiverId: string = ''; // Accepts receiverId as input
  messages: ChatMessage[] = [];
  newMessage: string = '';

  constructor(private chatService: SocketServiceService) {}

  ngOnInit(): void {
    // Fetch past messages between sender and receiver
    this.chatService.getMessages(this.receiverId).subscribe((fetchedMessages) => {
      this.messages = fetchedMessages;
    });

    // Listen for incoming messages
    this.chatService.onMessageReceived().subscribe((message: ChatMessage) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    const message: ChatMessage = {
      content: this.newMessage,
      receiver_id: this.receiverId
    };

    this.chatService.sendMessage(message).subscribe(() => {
      this.newMessage = '';
    });
  }
}
