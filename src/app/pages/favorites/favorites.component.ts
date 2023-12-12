import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { User } from 'src/app/models/user';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MeditationService } from 'src/app/services/meditation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  favoriteTechniques!: MeditationTechnique[];
  currentUser = +localStorage.getItem('user_id')!;
  technique!: MeditationTechnique;
  meditationTechnique!: MeditationTechnique

  constructor(private favoriteService: FavoriteService, private meditationService: MeditationService, private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadUserFavorites();
  }

  private loadUserFavorites() {
    if (this.currentUser) {
      this.userService.getUserById(this.currentUser).subscribe({
        next: (user: User) => {
          this.favoriteTechniques = user.favorites;
          console.log('Favorites reçus :', this.favoriteTechniques);

          if (this.favoriteTechniques && this.favoriteTechniques.length > 0) {
            this.technique = this.favoriteTechniques[0];
            console.log('Première technique:', this.technique.name);
          }
        },
        error: error => {
          console.error('Il y a une erreur', error);
        }
      });
    }
  }

  openFavorite(favorite: MeditationTechnique) {
    this.meditationService.getMeditationById(favorite.id).subscribe({
      next: (meditationDetails) => {
        this.router.navigate(['/meditation/', favorite.id])
      }
    })
  }


}
