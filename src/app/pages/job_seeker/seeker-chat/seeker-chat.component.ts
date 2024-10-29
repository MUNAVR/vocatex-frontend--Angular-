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
  constructor(private chatService: SocketServiceService){}

  messages: ChatMessage[] = [];
  newMessage: string = '';
  userId: string = ''
  receiverId: string = '';

  ngOnInit(): void {
    this.loadMessages();
    this.chatService.onMessageReceived().subscribe((message: ChatMessage) => {
      this.messages.push(message);
    });
  }

  loadMessages() {
    this.chatService.getMessages(this.userId, this.receiverId).subscribe(messages => {
      this.messages = messages;
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
