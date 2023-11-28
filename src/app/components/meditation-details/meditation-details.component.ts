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
  meditVideo!: any;
  displayedKeyword: string[] = [];
  currentKeywordIndex = 0;
  currentKeyword: string = "";

  isImage : boolean = false;
  isVideo : boolean = false;

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
    }, 15000);
  }

  getMeditationDetails(id: number): void {
    this.meditationService.getMeditationById(id).subscribe((meditation) => {
      this.meditation = meditation;

      if (meditation.visualMedia) {
        this.mediaService.getMédiaById(meditation.visualMedia.id).subscribe((data: Blob) => {
          if(data.type.startsWith('image/')){
            this.createImageFromBlob(data);
          }else if (data.type.startsWith('video/')) {
            this.createVideoFromBlob(data);
          }
        });
      }

      // if (meditation.visualMedia) {
      //   this.mediaService.getMédiaById(meditation.visualMedia.id).subscribe((data: Blob) => {
      //     this.createVideoFromBlob(data);
      //   });
      // }

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
    this.isImage= true;
    this.isVideo = false;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.meditImg = reader.result;
      console.log("l\'image",this.meditImg)
    });
  }

  createAudioFromBlob(audio: Blob) {

    const reader = new FileReader();
    reader.readAsDataURL(audio);
    reader.addEventListener('load', () => {
      this.meditAudio = reader.result;
    });
  }

  createVideoFromBlob(video: Blob){
    this.isVideo = true;
    this.isImage = false;
    const reader = new FileReader();
    reader.readAsDataURL(video);
    reader.addEventListener('load', ()=>{
      this.meditVideo= reader.result;
    })
    
  }


  displayKeyword(): void {
    if (this.meditation && this.meditation.keyword) {
      this.currentKeywordIndex = (this.currentKeywordIndex + 1) % this.meditation.keyword.length;
      this.currentKeyword = this.meditation.keyword[this.currentKeywordIndex];
    }
  }


}
