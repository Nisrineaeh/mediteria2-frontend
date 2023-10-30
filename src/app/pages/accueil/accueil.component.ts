import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Forum } from 'src/app/models/forum';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { User } from 'src/app/models/user';
import { ForumService } from 'src/app/services/forum.service';
import { MeditationService } from 'src/app/services/meditation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit{
  latestMeditations: MeditationTechnique[] = [];
  latestUsers: User[] = [];
  totalUsers: number = 0;


  constructor(
    private meditationService: MeditationService, private userService: UserService

  ) { }

  ngOnInit(): void {
    this.loadLatestMeditations()
    this.loadLatestUsers()
  }

  loadLatestMeditations(): void {
    this.meditationService.getAllMeditations().subscribe(meditations => {
      const sortedMeditations = meditations.sort((a, b) => b.id - a.id);
      this.latestMeditations = sortedMeditations.slice(0, 3);
    });
  }

  loadLatestUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      const sortedUsers = users.sort((a, b) => b.id - a.id);
      this.latestUsers = sortedUsers.slice(0, 3);
      this.totalUsers = users.length;
    });
  }
  }





