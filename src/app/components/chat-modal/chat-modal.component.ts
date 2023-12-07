import { Component, Input, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent implements OnInit {


  messages: Message[] = [];
  messageForm: FormGroup;
  currentUser = { id: this.userService.getUserConnected()! };
  receiverUser = localStorage.getItem('receiverId')!
  // senderUsername: string = localStorage.getItem('username')!;
  senderUsername! : string;

  @Input() otherUserId!: number;
  @Input() selectedUser!: User;



  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private ws: WebSocketService,
    private modalService: NgbModal,
   private ngZone: NgZone,

  ) {
    this.messageForm = this.fb.group({
      newMessage: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMessages();
    this.getUsername();
  }

  loadMessages() {
    const currentUserId = this.currentUser.id;
    const receiverId = this.selectedUser.id;

    this.messageService.getUserChats(currentUserId, receiverId).subscribe({
      next: (existingMessages: Message[]) => {
        console.log("Messages bruts reçus :", existingMessages);
        this.messages = existingMessages;
        const lastMessage = existingMessages[existingMessages.length - 1];
        console.log("Dernier message de la conv :", lastMessage);

      },
      error: (error: any) => {
        console.error('Erreur lors de la récup des messages existants:', error);
      }
    });
    this.ws.listen('msgToClient').subscribe((data: any) => {

      if (typeof data === 'object' && 'sender' in data && 'receiver' in data && 'content' in data && 'date' in data) {
        const newMessage: Message = {
          id_message: 0,
          username: data.username,
          sender: data.sender,
          receiver: data.receiver,
          content: data.content,
          date: new Date(data.date),
        };
        this.messages.push(newMessage);
      }
    });
  }

  getUsername(){
    this.userService.getUserById(this.currentUser.id).subscribe(
      (userData)=>{
        this.senderUsername = userData.username;
      }
    )
  }

  sendMessage(): void {
    if (!this.receiverUser || this.receiverUser === '0') {
      console.error('ID du destinataire invalide.');
      return;
    }
    if (this.messageForm.valid && this.currentUser.id) {
      const newMessageContent = this.messageForm.get('newMessage')?.value.trim();
      if (newMessageContent) {
        const newMessage: Message = {
          id_message: 0,
          username:this.senderUsername,
          sender: { id: +this.currentUser.id },
          receiver: { id: +this.receiverUser },
          content: newMessageContent,
          date: new Date(),
        };

        this.messageService.sendMessage(newMessageContent, this.currentUser.id, +this.receiverUser).subscribe(() => {
          this.messageForm.reset();
        });

        this.ws.emit('msgToServer', newMessage);
      }
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}