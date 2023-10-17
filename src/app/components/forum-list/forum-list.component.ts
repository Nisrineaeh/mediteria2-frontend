import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Forum } from 'src/app/models/forum';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { ForumService } from 'src/app/services/forum.service';
import { MeditationService } from 'src/app/services/meditation.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forums: MeditationTechnique[] = [];

  constructor(private forumService: ForumService, private router: Router, private meditationService: MeditationService,) { }

  ngOnInit(): void {
    this.meditationService.getAllMeditations().subscribe({
      next: (data) => {
        this.forums = data;
      },
      error: (error) => {
        console.error('Il y a une erreur !', error);
      }
    });
  }

  onForumSelect(forumId: number) {
    this.router.navigate(['/forum-detail', forumId]);
  }

}