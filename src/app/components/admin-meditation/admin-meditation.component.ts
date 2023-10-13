import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { Comment } from 'src/app/models/comment';

import { Favorite } from 'src/app/models/favorite';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
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
  
  newCommentTexts: { [key: number]: string } = {};

  @Input() techniqueId?: number;


  constructor(private meditationService: MeditationService, private favoriteService: FavoriteService, private commentService: CommentService){}

  ngOnInit(): void {
    this.getAllMeditationAndFavorites();
    this.getUserFavorites();


    this.favoriteService.favoriteUpdated$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.getAllMeditationAndFavorites();
        this.getUserFavorites();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['techniqueId']) {
      this.getAllMeditationAndFavorites();
      this.getUserFavorites();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

 

  getAllMeditationAndFavorites() {
    const userId = +localStorage.getItem('user_id')!;

    const meditations$ = this.meditationService.getAllMeditations();
    const favorites$ = this.favoriteService.getUserFavorites(userId);

    forkJoin([meditations$, favorites$]).subscribe(([meditations, favorites]) => {
      this.techniques = meditations;
      this.userFavorites = favorites;

      this.techniques.forEach(technique => {
        technique.isFavorite = this.userFavorites.some(fav => fav.meditation_technique.id === technique.id);
        this.commentService.getCommentsByTechnique(technique.id).subscribe(comments => {
          technique.comments = comments;
        });
      });
    });
  }

  onFavoriteChanged(isFavorite: boolean, technique: any) {
    technique.isFavorite = isFavorite;
  }

  

  // onAddComment(technique: MeditationTechnique): void {
  //   console.log('Tentative d\'envoi de commentaire');
  //   const commentText = this.newCommentTexts[technique.id];

  //   if (!commentText || !commentText.trim()) {
  //     console.log('Le texte du commentaire est vide, donc il ne sera pas envoyé.');
  //     return;
  //   }

  //   const newComment: Comment = {
  //     comment: commentText,
  //     meditationtechniqueId: technique.id,
  //     userId: +localStorage.getItem('user_id')!,
  //     date: new Date().toISOString()
  //   };

  //   console.log('LE COMMENTAIRE :', newComment);

  //   this.commentService.addComment(newComment).subscribe({
  //     next: (addedComment) => {
  //       if (!technique.comments) {
  //         technique.comments = [];
  //       }
  //       technique.comments.push(addedComment);
  //       this.newCommentTexts[technique.id] = '';
  //       console.log('Commentaire ajouté avec succès.', addedComment);
  //     },
  //     error: (error) => {
  //       console.error('Erreur lors de l\'ajout du commentaire :', error);
  //     }
  //   });
  // }

  onAddComment(technique: MeditationTechnique): void {
    console.log('Tentative d\'envoi de commentaire');

    const commentText = this.newCommentTexts[technique.id];

    if (!commentText || !commentText.trim()) {
      console.log('Le texte du commentaire est vide, donc il ne sera pas envoyé.');
      return;
    }

    const commentPayload = {
      comment: commentText,
      userId: +(localStorage.getItem('user_id'))!,
      meditationTechniqueId: technique.id,
      date: new Date().toISOString()
    };

    console.log('LE COMMENTAIRE :', commentPayload);

    this.commentService.addComment(commentPayload).subscribe({
      next: (addedComment) => {
        if (!technique.comments) {
          technique.comments = [];
        }
        technique.comments.push(addedComment);
        this.newCommentTexts[technique.id] = '';
        console.log('Commentaire ajouté avec succès.', addedComment);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
      }
    });
  }






}


