import { Component, OnInit } from '@angular/core';
import { SocketServiceService } from '../../../core/services/socket/socket-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../../models/chat';

@Component({
  selector: 'app-seeker-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './seeker-chat.component.html',
  styleUrl: './seeker-chat.component.css'
})
export class SeekerChatComponent implements OnInit {
  @Input() receiverId: string = '';
  messages: ChatMessage[] = [];
  newMessage: string = '';

  constructor(private chatService: SocketServiceService) {}

  ngOnInit(): void {
    this.chatService.getMessages(this.receiverId).subscribe((fetchedMessages) => {
      this.messages = fetchedMessages;
    });

    this.chatService.onMessageReceived().subscribe((message: ChatMessage) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    const message: ChatMessage = {
      content: this.newMessage,
      receiver_id: this.receiverId,
    };
    this.chatService.sendMessage(message);
    this.messages.push(message); 
    this.newMessage = ''; 
  }

}
