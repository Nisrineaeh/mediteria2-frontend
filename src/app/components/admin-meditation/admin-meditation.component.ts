import { Component, OnInit } from '@angular/core';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { MeditationService } from 'src/app/services/meditation.service';

@Component({
  selector: 'app-admin-meditation',
  templateUrl: './admin-meditation.component.html',
  styleUrls: ['./admin-meditation.component.css']
})
export class AdminMeditationComponent implements OnInit{

  techniques: MeditationTechnique[] =[];

  constructor(private meditationService: MeditationService){}

  ngOnInit(): void {
    this.getAllMeditation()
  }

  getAllMeditation(){
    this.meditationService.getAllMeditations().subscribe(data =>{
      this.techniques = data;
    })
  }
}
