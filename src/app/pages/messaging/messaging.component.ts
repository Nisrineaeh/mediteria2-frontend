import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatModalComponent } from 'src/app/components/chat-modal/chat-modal.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  users: User[] = [];
  private currentUserId:number= +localStorage.getItem('user_id')!;
  searchTerm: string = '';
  currentUser!: User;

  constructor(private usersService: UserService, private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(allUsers => {
      this.users = allUsers.filter(user => user.id !== this.currentUserId);
    });
  }


  get filteredUsers() {
    if (this.searchTerm) {
      return this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    return this.users;
  }

 
  openChatModal(user: User) {
    localStorage.setItem('receiverId', user.id.toString());
    const modalRef = this.modalService.open(ChatModalComponent, { centered: true, size: 'lg', windowClass: 'custom-modal-width' });
    modalRef.componentInstance.selectedUser = user;
    modalRef.componentInstance.usernameFromParent = user.username;
  }


}
