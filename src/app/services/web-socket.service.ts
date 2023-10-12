import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Message } from '../models/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: Socket) {
    // this.socket = io('ws://localhost:3000/')
  }

  listen(eventName: string) {
    console.log("Listen");
    // return this.socket.fromEvent(eventName);
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        console.log("-------", data);

        subscriber.next(data);

      })
    })
  }

  emit(eventName: string, data: Message) {
    console.log(`émission de l'événement ${eventName} avec ca comme data :`, data);
    this.socket.emit(eventName, data);
  }

}
