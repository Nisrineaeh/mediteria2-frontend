import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css']
})
export class HeartComponent {
  private userId = +localStorage.getItem('user_id')!;
  private favoriteId?: number;


  @Input() techniqueId?: number;
  @Input() isFavorite?: boolean = false;
  @Output() favoriteChanged = new EventEmitter<boolean>();

  @ViewChild('deleteToast') deleteToast!: ElementRef;

  constructor(private favoriteService: FavoriteService) { }

  toggleFavorite() {
    if (this.isFavorite) {
      return this.showToast('La technqiue est déjà dans votre rubrique favoris, allez dans votre profil pour la supprimer 😊');
    } else {
      this.favoriteService.addFavorite(this.userId, this.techniqueId!)
        .subscribe({
          next: (response: MeditationTechnique) => {
            this.isFavorite = true;
            this.favoriteId = response.id;
            this.favoriteChanged.emit(this.isFavorite);
            this.showToast('Technique ajoutée aux favoris avec succès !');
          },
          error: (error) => {
            console.error("Erreur lors de l'ajout en favoris", error);
          }
        });
    }
  }


  showToast(message: string) {
    this.deleteToast.nativeElement.querySelector('.toast-body').textContent = message
    this.deleteToast.nativeElement.classList.add('show')
  }





}
