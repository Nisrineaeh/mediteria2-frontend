import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: Socket) {
    // this.socket = io('ws://localhost:3000/')
  }

  // initConnection(): void {
  //   this.socket = new Socket({ url: 'http://localhost:3000', options: {} });
  // }

  listen(eventName: string) {
    console.log("Listen");
    return this.socket.fromEvent(eventName);
    // return new Observable((subscriber) => {
    //   this.socket.on(eventName, (data: any) => {
    //     console.log("-------", data);

    //     subscriber.next(data);

    //   })
    // })
  }

  emit(eventName: string, data: Message) {
    console.log(`émission de l'événement ${eventName} avec ca comme data :`, data);
    this.socket.emit(eventName, data);
  }

}
