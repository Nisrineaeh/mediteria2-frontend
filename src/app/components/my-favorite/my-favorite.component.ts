import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Favorite } from 'src/app/models/favorite';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MeditationService } from 'src/app/services/meditation.service';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.css']
})
export class MyFavoriteComponent {
  favoriteTechniques!: Favorite[];
  private currentUser = +localStorage.getItem('user_id')!;
  technique!: MeditationTechnique;
  meditationTechnique!: MeditationTechnique

  @ViewChild('deleteToast') deleteToast!: ElementRef;


  constructor(private favoriteService: FavoriteService, private meditationService: MeditationService
    , private router : Router) { }

  ngOnInit(): void {
    this.loadUserFavorites();
  }

  private loadUserFavorites() {
    this.favoriteService.getUserFavorites(this.currentUser).subscribe({
      next: (favorites: Favorite[]) => {
        this.favoriteTechniques = favorites;
        console.log('Favorites recus :', this.favoriteTechniques);

        if (this.favoriteTechniques && this.favoriteTechniques.length > 0) {

          this.technique = this.favoriteTechniques[0].meditation_technique;
          console.log('Première technique:', this.technique.name);
        }
      },
      error: error => {
        console.error('Il y a une erreur', error);
      }
    });
  }

  removeFromFavorites(favoriteId: number) {
    this.favoriteService.removeFavorite(favoriteId)
      .subscribe({
        next: () => {
          this.showToast('Technique supprimée de vos favoris avec succès !')
          this.loadUserFavorites();
          this.favoriteService.notifyFavoriteUpdated()
        },
        error: error => {
          console.error('Erreur lors de la suppression du favori', error);
        }
      });
  }

  openFavorite(favorite : Favorite){
  this.meditationService.getMeditationById(favorite.meditation_technique.id).subscribe({
    next: (meditationDetails)=>{
      this.router.navigate(['/meditation/', favorite.meditation_technique.id])
    }
  })
}

  showToast(message: string) {
    this.deleteToast.nativeElement.querySelector('.toast-body').textContent = message;
    const toast = new bootstrap.Toast(this.deleteToast.nativeElement);
    toast.show();
  }

}