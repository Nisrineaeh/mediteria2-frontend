import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: Socket) {  }


  listen(eventName: string) {
    console.log("Listen");
    return this.socket.fromEvent(eventName);
  }

  emit(eventName: string, data: Message) {
    console.log(`émission de l'événement ${eventName} avec ca comme data :`, data);
    this.socket.emit(eventName, data);
  }

}
