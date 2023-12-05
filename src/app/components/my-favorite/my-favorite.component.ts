import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { User } from 'src/app/models/user';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MeditationService } from 'src/app/services/meditation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.css']
})
export class MyFavoriteComponent {
  favoriteTechniques!: MeditationTechnique[];
  currentUser = +localStorage.getItem('user_id')!;
  technique!: MeditationTechnique;
  meditationTechnique!: MeditationTechnique

  @ViewChild('deleteToast') deleteToast!: ElementRef;


  constructor(private favoriteService: FavoriteService, private meditationService: MeditationService,private userService: UserService,
    private router : Router) { }

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

  removeFromFavorites(userId: number, meditationTechniqueId: number) {
    this.favoriteService.removeFavorite(userId, meditationTechniqueId)
      .subscribe({
        next: () => {
          this.showToast('Technique supprimée de vos favoris avec succès !');
          this.loadUserFavorites();
          this.favoriteService.notifyFavoriteUpdated();
        },
        error: error => {
          console.error('Erreur lors de la suppression du favori', error);
        }
      });
  }

  openFavorite(favorite : MeditationTechnique){
  this.meditationService.getMeditationById(favorite.id).subscribe({
    next: (meditationDetails)=>{
      this.router.navigate(['/meditation/', favorite.id])
    }
  })
}

  showToast(message: string) {
    this.deleteToast.nativeElement.querySelector('.toast-body').textContent = message;
    const toast = new bootstrap.Toast(this.deleteToast.nativeElement);
    toast.show();
  }

}