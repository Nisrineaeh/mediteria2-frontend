import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeditationTechnique } from 'src/app/models/meditation-technique';
import { MeditationService } from 'src/app/services/meditation.service';
import { MédiaService } from 'src/app/services/média.service';

@Component({
  selector: 'app-meditation-details',
  templateUrl: './meditation-details.component.html',
  styleUrls: ['./meditation-details.component.css']
})
export class MeditationDetailsComponent implements OnInit {
  meditation!: MeditationTechnique;
  meditImg!: any;
  meditAudio!: any;

  displayedKeyword: string[] = [];
  currentKeywordIndex = 0;
  currentKeyword: string = "";

  constructor(
    private route: ActivatedRoute,
    private meditationService: MeditationService,
    private mediaService: MédiaService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const meditationId = +params['id'];
      this.getMeditationDetails(meditationId);
    });

    setInterval(() => {
      this.displayKeyword();
    }, 35000);
  }

  getMeditationDetails(id: number): void {
    this.meditationService.getMeditationById(id).subscribe((meditation) => {
      this.meditation = meditation;

      if (meditation.visualMedia) {
        this.mediaService.getMédiaById(meditation.visualMedia.id).subscribe((data: Blob) => {
          this.createImageFromBlob(data);
        });
      }

      if (meditation.audioMedia) {
        this.mediaService.getMédiaById(meditation.audioMedia.id).subscribe((data: Blob) => {
          this.createAudioFromBlob(data);
        });
      }

      if (typeof meditation.keyword === 'string') {
        meditation.keyword = meditation.keyword
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .map(word => word.trim().replace(/"/g, ''));
      }


      this.displayKeyword();
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.meditImg = reader.result;
    });
  }

  createAudioFromBlob(audio: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(audio);
    reader.addEventListener('load', () => {
      this.meditAudio = reader.result;
    });
  }

  displayKeyword(): void {
    if (this.meditation && this.meditation.keyword) {
      console.log("Displaying keyword");
      if (this.currentKeywordIndex < this.meditation.keyword.length) {
        this.currentKeyword = this.meditation.keyword[this.currentKeywordIndex];
        this.currentKeywordIndex++;
      } else {
        this.currentKeyword = this.meditation.keyword[0];
        this.currentKeywordIndex = 1;
      }
    }
  }



}
