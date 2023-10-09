import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userData!: User;
  user!: User;
  modalRef!: BsModalRef;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: BsModalService,
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
}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteAccount() {

    const userId = +localStorage.getItem('user_id')!;
    this.userService.deleteUserAccount(userId).subscribe({
      next: (response) => {
        console.log('Compte supprimé avec succès');
        this.router.navigate(['/first']);
        this.modalRef.hide();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du compte', error);
      }
    });
  }
}