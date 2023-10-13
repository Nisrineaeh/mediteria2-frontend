import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userData!: User;
  user!: User;
  modalRef!: BsModalRef;
  usersWithConversations: User[] = [];
  currentUserId: String = localStorage.getItem('user_id')!;
  searchTerm: string = '';
  
  @ViewChild('deleteTemplate')deleteTemplate!: TemplateRef<any>;
  @Input() selectedUser!: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: BsModalService,
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

    console.log('utilisateur pour la modal :', this.selectedUser)
    this.messagesService.getUserConversations(+this.currentUserId).subscribe(users => {
      this.usersWithConversations = users;
    });
}

  openModal(template: TemplateRef<any>) {
    console.log('Trying to open modal...');
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered'
    });
  }

  deleteAccount() {

    const userId = +localStorage.getItem('user_id')!;
    this.userService.deleteUserAccount(userId).subscribe({
      next: (response) => {
        console.log('Compte supprimé avec succès');
        this.router.navigate(['/first']);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du compte', error);
      }
    });
  }

  // continueConversation(user: User) {
  //   localStorage.setItem('receiverId', user.id.toString());
  //   console.log('Ouverture de la modal pour user :', user)
  //   const modalRef = this.modalService.show(ChatModalComponent, {
  //     initialState: {
  //       selectedUser: user
  //     },
  //     class: 'modal-lg custom-modal-width'
  //   });
  // }

  // get filteredUsers(): User[] {
  //   if (this.searchTerm) {
  //     return this.usersWithConversations.filter(
  //       user => user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   }
  //   return this.usersWithConversations;
  // }


  get filteredConversations(): User[] {
    if (this.searchTerm) {
      return this.usersWithConversations.filter(user =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    return this.usersWithConversations;
  }


}