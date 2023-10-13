import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/models/forum';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forums: Forum[] = [];  // Ici, nous typons 'forums' comme un tableau de 'Forum'.

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getForums().subscribe((data: Forum[]) => {
      this.forums = data;
    }, error => {
      console.error('Erreur lors de la récupération des forums:', error);
    });

  }
}