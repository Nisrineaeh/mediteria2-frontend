import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable, Subject, forkJoin, map, switchMap, takeUntil } from 'rxjs';
import { Comment } from 'src/app/models/comment';

import { Favorite } from 'src/app/models/favorite';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MeditationService } from 'src/app/services/meditation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-meditation',
  templateUrl: './admin-meditation.component.html',
  styleUrls: ['./admin-meditation.component.css']
})
export class AdminMeditationComponent implements OnInit, OnChanges, OnDestroy{
 
  techniques: MeditationTechnique[] =[];
  userFavorites: Favorite[] = [];
  private ngUnsubscribe = new Subject<void>();
  comments: Comment[] = [];
  newCommentTexts: { [key: number]: string } = {};
  currentUser?: User;

  @Input() techniqueId?: number;


  constructor(private meditationService: MeditationService, private favoriteService: FavoriteService, private commentService: CommentService, private userService: UserService){}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
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
    const userId = Number(localStorage.getItem('user_id'))!;
    const meditations$ = this.meditationService.getAllMeditations();
    const favorites$ = this.favoriteService.getUserFavorites(userId);

    forkJoin([meditations$, favorites$]).subscribe(([meditations, favorites]) => {
      this.techniques = meditations;
      this.userFavorites = favorites;

      this.techniques.forEach(technique => {
        technique.isFavorite = this.userFavorites.some(fav => fav.meditation_technique.id === technique.id);
        
    
        this.commentService.getCommentsByTechnique(technique.id).subscribe(comments => {
          technique.comments = comments;
          console.log('REGARDE LA ', technique.comments);
          
       
          technique.comments.forEach(comment => {
            this.userService.getUserById((Number(comment.user_id))).subscribe(user => {
              comment.user = user;
            });
          });
        });
          
      });
    });
  }



  onFavoriteChanged(isFavorite: boolean, technique: any) {
    technique.isFavorite = isFavorite;
  }


  onAddComment(technique: MeditationTechnique): void {
    console.log('Tentative d\'envoi de commentaire');

    const commentText = this.newCommentTexts[technique.id];

    if (!commentText || !commentText.trim()) {
      console.log('Le texte du commentaire est vide, donc il ne sera pas envoyé.');
      return;
    }

    const commentPayload = {
      comment: commentText,
      user_id:  +(localStorage.getItem('user_id'))!,
      meditationTechniqueId: technique.id,
      date: new Date().toISOString(),
  
    };

    console.log('LE COMMENTAIRE :', commentPayload);

    this.commentService.addComment(commentPayload).subscribe({
      next: (addedComment) => {
        if (!technique.comments) {
          technique.comments = [];
        }
        addedComment.user_id = +(localStorage.getItem('user_id'))!;
        addedComment.user = this.currentUser;
        technique.comments.push(addedComment);
        this.newCommentTexts[technique.id] = '';
        console.log('Commentaire ajouté avec succès.', addedComment);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
      }
    });

    
  }

  onDeleteComment(commentId: number, index: number): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments.splice(index, 1);
        alert('Commentaire effacer');
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du commentaire :', error);
      }
    });
  }

  isUserAllowedToDelete(commentUserId: number): boolean {
  
    return this.currentUser ? commentUserId === this.currentUser.id : false;
  }


 

}


