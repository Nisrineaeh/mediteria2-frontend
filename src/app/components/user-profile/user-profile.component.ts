import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userData!: User;
  user!: User;
  modalRef!: NgbModalRef;
  usersWithConversations: User[] = [];
  currentUserId: String = localStorage.getItem('user_id')!;
  searchTerm: string = '';
  
  @Input() selectedUser!: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private messagesService: MessageService,
  ) {}

  ngOnInit() {
   
    console.log('Id user actuel', localStorage.getItem('user_id'));

    this.userService.getUserProfile().subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération du profil utilisateur', error);
      },
    });

    this.messagesService.getUserConversations(+this.currentUserId).subscribe(users => {
      this.usersWithConversations = users;
    });
}

  openModal(template: TemplateRef<any>) {
    console.log('Trying to open modal...');
    this.modalRef = this.modalService.open(template);
  }

  deleteAccount() {

    const userId = +localStorage.getItem('user_id')!;
    this.userService.deleteUserAccount(userId).subscribe({
      next: (response) => {
        console.log('Compte supprimé avec succès');
        localStorage.clear();
        this.router.navigate(['/landing']);
        this.modalRef.dismiss()
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du compte', error);
      }
    });
  }

  continueConversation(user: User) {
    localStorage.setItem('receiverId', user.id.toString());
    console.log('Ouverture de la modal pour user :', user)
    const modalRef = this.modalService.open(ChatModalComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.selectedUser = user;
  }



  get filteredConversations(): User[] {
    if (this.searchTerm) {
      return this.usersWithConversations.filter(user =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    return this.usersWithConversations;
  }


}