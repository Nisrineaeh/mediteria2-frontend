import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  stopVideo(video: HTMLVideoElement) {
    console.log(video)
    if (!video.play) {
      video.play();
    } else {
      video.pause();
    }
  }


}
