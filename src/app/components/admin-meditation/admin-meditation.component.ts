import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Favorite } from 'src/app/models/favorite';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MeditationService } from 'src/app/services/meditation.service';

@Component({
  selector: 'app-admin-meditation',
  templateUrl: './admin-meditation.component.html',
  styleUrls: ['./admin-meditation.component.css']
})
export class AdminMeditationComponent implements OnInit, OnChanges, OnDestroy{

  techniques: MeditationTechnique[] =[];
  userFavorites: Favorite[] = [];
  private ngUnsubscribe = new Subject<void>();

  @Input() techniqueId?: number;


  constructor(private meditationService: MeditationService, private favoriteService: FavoriteService){}

  ngOnInit(): void {
    this.getAllMeditation();
    this.getUserFavorites();

    this.favoriteService.favoriteUpdated$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.getAllMeditation();
        this.getUserFavorites();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['techniqueId']) {
      this.getAllMeditation();
      this.getUserFavorites();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getAllMeditation(){
    this.meditationService.getAllMeditations().subscribe(data =>{
      this.techniques = data;
    })
  }

  getUserFavorites(): void {
    const userId = +localStorage.getItem('user_id')!;

    this.favoriteService.getUserFavorites(userId).subscribe(favorites => {
      this.userFavorites = favorites;

      this.techniques.forEach(technique => {
        technique.isFavorite = this.userFavorites.some(fav => fav.meditation_technique.id === technique.id);
      });
    });
  }

  onFavoriteChanged(isFavorite: boolean, technique: any) {
    technique.isFavorite = isFavorite;
  }
}
