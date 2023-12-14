import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private lastMessageId = 0;
  private bddUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  sendMessage(content: Message, senderId: number, receiverId: number) {
    const headers = this.getHeaders();
    const body = { content, senderId, receiverId };
    return this.http.post<Message>(`${environment.api}/message`, body, { headers });
  }

  getUserChats(senderId: number, receiverId: number): Observable<Message[]> {
    const headers = this.getHeaders();
    return this.http.get<Message[]>(`${environment.api}/message/conversation/${senderId}/${receiverId}`, { headers }).pipe(
      tap((messages: Message[]) => {
        console.log('Message recu de api : ', messages)
        if (messages.length > 0) {
          this.lastMessageId = messages[messages.length - 1].id_message;
          console.log('Dernier message : ', this.lastMessageId);
        } else {
          console.log('Pas de messages reçus');
        }
      })

    );
  }
  
  getUserConversations(userId: number): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${environment.api}/message/list/${userId}`, { headers });
  }
}
