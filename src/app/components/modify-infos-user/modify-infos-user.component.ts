import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modify-infos-user',
  templateUrl: './modify-infos-user.component.html',
  styleUrls: ['./modify-infos-user.component.css']
})
export class ModifyInfosUserComponent {

  newUsername?: string;
  newDescription?: string;
  newEmail?: string;

  user = +localStorage.getItem('user_id')!;

  constructor(private userService: UserService, private router: Router){}

 
  onSubmit() {
    const userData: any = {};
    if (this.newUsername && this.newUsername.trim() !== '') userData.username = this.newUsername;
    if (this.newDescription && this.newDescription.trim() !== '') userData.description = this.newDescription;
    if (this.newEmail && this.newEmail.trim() !== '') userData.email = this.newEmail;

    if (Object.keys(userData).length === 0) {
      console.error('Aucun champ valide à mettre à jour.');
      return;
    }

    this.userService.modifyInfosUser(this.user, userData).subscribe({
      next: (response) => {
        console.log('Profil modifié avec succès', response);
        localStorage.setItem('username', response.username);
        this.router.navigate(['/profil'])
      },
      error: (error) => {
        console.error('Erreur lors de la modification du profil', error);
      },
    });
  }

  
}


