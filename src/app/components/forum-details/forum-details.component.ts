import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Forum } from 'src/app/models/forum';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { User } from 'src/app/models/user';
import { ForumService } from 'src/app/services/forum.service';
import { MeditationService } from 'src/app/services/meditation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.css']
})
export class ForumDetailsComponent implements OnInit {
  message!: string;
  forumId!: number;
  forum: Forum[]=[];
  messages: string[] = [];
  currentUser!: User;
  currentUserId= +localStorage.getItem('user_id')!;
  techniques: MeditationTechnique[] = [];
  newMessageContent: string = '';

  @ViewChild('deleteToast') deleteToast!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
    private userService: UserService,
    private meditationService: MeditationService,
  ) { }

  ngOnInit() {
    const techniqueId = this.route.snapshot.params['id'];
    this.getForumDetails(techniqueId);
  }

  getForumDetails(idTechnique: number) {
    this.forumService.getForumByTechnique(idTechnique).subscribe({
      next: (forums) => {
        const requetesUtilisateur = forums.map(message => this.userService.getUserById(message.user_id));
        forkJoin(requetesUtilisateur).subscribe({
          next: (utilisateurs) => {
            forums.forEach((message, index) => {
              message.user = utilisateurs[index];
            });
            this.forum = forums;
            console.log('Forums avec données utilisateur', forums);
          },
          error: (erreur) => {
            console.error('Erreur lors de la récupération des utilisateurs', erreur);
          }
        });
      },
      error: (erreur) => {
        console.error('Erreur lors de la récupération des forums', erreur);
      }
    });
  }


  onSubmit() {
    const idTechnique = this.route.snapshot.params['id'];
    this.newMessageContent = this.newMessageContent.trim();

    if (!this.newMessageContent) {
      console.error('Le message est vide. Veuillez écrire quelque chose avant d\'envoyer.');
      alert('Le message est vide. Veuillez écrire quelque chose avant d\'envoyer.');
      return;
    }

    this.meditationService.getMeditationById(+idTechnique).subscribe({
      next: (technique) => {
        if (!technique) {
          console.error(`Aucune technique de méditation trouvée pour l'ID: ${idTechnique}`);
          return;
        }

        const messageAEnvoyer: Forum = {
          date: new Date(),
          message: this.newMessageContent,
          user_id: +localStorage.getItem('user_id')!, 
          meditation_technique_id: +idTechnique,
          name: technique.name,
        };

        this.forumService.addMessageForum(messageAEnvoyer).subscribe({
          next: (reponse) => {
            this.forum.push(reponse);
            this.newMessageContent = '';
          },
          error: (erreur) => {
            console.error('Erreur lors de l’envoi du message', erreur);
          }
        });
      },
      error: (erreur) => {
        console.error(`Erreur lors de la récupération de la technique de méditation pour l'ID: ${idTechnique}`, erreur);
      }
    });
  }


  onDeleteMessage(idMessage: number) {
    this.forumService.deleteMessage(idMessage).subscribe({
      next: () => {
        this.forum = this.forum.filter(message => message.id !== idMessage)
        this.showToast('Message supprimé avec succès !')
        this.refreshForum()
      },
      error: (erreur) => {
        console.error('Erreur lors de la suppression du message', erreur)
        this.showToast('Erreur lors de la suppression du message !')
      }
    });
  }

  refreshForum() {
    const idTechnique = this.route.snapshot.params['id'];
    this.getForumDetails(idTechnique);
  }

  showToast(message: string) {
    this.deleteToast.nativeElement.querySelector('.toast-body').textContent = message
    this.deleteToast.nativeElement.classList.add('show')
  }


}








