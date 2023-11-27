import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { Favorite } from 'src/app/models/favorite';
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
      return this.showToast('Il est déjà dans ta rubrique favoris, va dans ton profil si tu veux le supprimer 😊')
    }
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite) {
      console.log("Technique ID:", this.techniqueId);
      this.favoriteService.addFavorite(this.userId, this.techniqueId!)
        .subscribe({
          next: (response: Favorite) => {
            this.favoriteId = response.id;
            this.favoriteChanged.emit(this.isFavorite);
          },
          error: (error) => {
            console.error("Erreur lors de l'ajout en favoris", error);
            this.isFavorite = !this.isFavorite;
          }
        });
    } else {
      if (this.favoriteId) {
        this.favoriteService.removeFavorite(this.favoriteId)
          .subscribe({
            next: (response) => {
              this.favoriteId = undefined;
              this.favoriteChanged.emit(this.isFavorite);
            },
            error: (error) => {
              console.error("Erreur lors de la suppression des favoris", error);
              this.isFavorite = !this.isFavorite;
            }
          });
      }
    }
  }


  showToast(message: string) {
    this.deleteToast.nativeElement.querySelector('.toast-body').textContent = message
    this.deleteToast.nativeElement.classList.add('show')
  }





}
