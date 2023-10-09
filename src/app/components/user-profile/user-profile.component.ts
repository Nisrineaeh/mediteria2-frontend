import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private userService: UserService,
    private router: Router
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
}