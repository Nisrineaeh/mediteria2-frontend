import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Forum } from 'src/app/models/forum';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { MessageForum } from 'src/app/models/message-forum';
import { User } from 'src/app/models/user';
// import { MessageForum } from 'src/app/models/message-forum';
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



  getForumDetails(techniqueId: number) {
    this.forumService.getForumByTechnique(techniqueId).subscribe(
      (forums) => {

        const userRequests = forums.map(message => this.userService.getUserById(message.user_id));

        forkJoin(userRequests).subscribe(users => {

          forums.forEach((message, index) => {
            message.user = users[index];
          });

          this.forum = forums;
          console.log('Forums with user data', forums);
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des forums', error);
      }
    );
  }

  onSubmit() {
    const techniqueId = this.route.snapshot.params['id'];
    this.newMessageContent = this.newMessageContent.trim();

    if (!this.newMessageContent) {
      console.error('Le message est vide. Veuillez écrire quelque chose avant d\'envoyer.');
      alert('Le message est vide. Veuillez écrire quelque chose avant d\'envoyer.')
      return;
    }


    this.meditationService.getMeditationById(+techniqueId).subscribe(
      (technique) => {
          console.log('REGARDE LA',technique.name)
        if (!technique) {
          console.error(`Aucune technique de méditation trouvée pour l'ID: ${techniqueId}`);
          return;
        }

        const messageToSend: Forum = {
          date: new Date(),
          message: this.newMessageContent,
          user_id: +localStorage.getItem('user_id')!,
          meditation_technique_id: +techniqueId,
          name: technique.name,
        };

        console.log('MESSAGE DU FORUM ENVOYER', messageToSend);

        this.forumService.addMessageForum(messageToSend).subscribe(
          response => {
            
            this.forum.push(response);
            this.newMessageContent = '';
            alert('Message envoyé dans le forum!');
          },
          error => {
            console.error('Erreur lors de l’envoi du message', error);
          }
        );
      },
      (error) => {
        console.error(`Erreur lors de la récupération de la technique de méditation pour l'ID: ${techniqueId}`, error);
      }
    );
  }


  onDeleteMessage(messageId: number) {

    this.forumService.deleteMessage(messageId).subscribe(
      () => {
        this.forum = this.forum.filter(message => message.id !== messageId);
        alert('Message supprimé avec succès.');
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de la suppression du message', error);
      }
    );
  }

 

}








