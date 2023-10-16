import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/models/forum';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forums: Forum[] = [];

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getForums().subscribe(
      data => {
        this.forums = data;
      },
      error => {
        console.error('Il y a une erreur !', error);
      }
    );
  }

}