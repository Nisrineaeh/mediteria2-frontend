import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mediteria2Front';
//   swRegistration =  navigator.serviceWorker.register('app.worker.ts');
//   ngOnInit(): void {
//     this.main();
//   }

//   check(){
//     if(!('serviceWorker' in navigator)){
//       throw new Error('Pas de support Service Worker !')
//     }
//     if(!("PushManager" in window)){
//       throw new Error('Pas de push api support !')
//     }
//   }

//  async registerServiceWorker(){
//   return this.swRegistration;
//   }

//   async requestNotificationPermission(){
//     const permission = await window.Notification.requestPermission();
//     if(permission !== 'granted'){
//       throw new Error('Permission non accordé pour les notifications !')
//     }
//   }

//   showLocalNotification(title: string, body:string, image:any, swRegistration: any){
//     const options= {
//       body,
//       image
//     }
//     swRegistration.showLocalNotification(title, options)
//   }


//   async main(){
//     const permission = await window.Notification.requestPermission();
//     console.log(Notification.permission)
//     this.showLocalNotification('Titre de la notif', 'Message de la notif', "/assets/logo-svg.svg", this.swRegistration)
//   } 



}


