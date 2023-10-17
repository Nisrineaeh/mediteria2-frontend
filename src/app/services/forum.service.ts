import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forum } from '../models/forum';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private bddUrl = 'http://localhost:3000/forum'

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  // createForum(data: any, userId: number): Observable<Forum> {
  //   return this.http.post<Forum>(this.bddUrl, { ...data, user: userId });
  // }

  // getForums(): Observable<Forum[]> {
  //   return this.http.get<Forum[]>(this.bddUrl, {headers: this.getHeaders()});
  // }

  // getForumMessages(forumId: number): Observable<any> {
  //   return this.http.get<any>(`${this.bddUrl}/${forumId}`, { headers: this.getHeaders() });
  // }

  // deleteForum(id: number): Observable<any> {
  //   return this.http.delete(`${this.bddUrl}/${id}`, { headers: this.getHeaders() });
  // }

  // getForumById(id: number): Observable<Forum> {
  //   return this.http.get<Forum>(`${this.bddUrl}/${id}`, { headers: this.getHeaders() });
  // }

  // addMessageToForum(forumId: number, message: MessageForum): Observable<MessageForum> {
  //   const url = `${this.bddUrl}/${forumId}/messages`;
  //   return this.http.post<MessageForum>(url, message, { headers: this.getHeaders() });
  // }

 
  getForumByTechnique(techniqueId: number): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${this.bddUrl}/technique/${techniqueId}`, { headers: this.getHeaders() });
  }

  addMessageForum(forum: Forum): Observable<Forum> {
    console.log('Le comments', forum)
    return this.http.post<Forum>(`${this.bddUrl}`, forum, { headers: this.getHeaders() });
  }

  deleteComment(forumId: number): Observable<void> {
    return this.http.delete<void>(`${this.bddUrl}/${forumId}`, { headers: this.getHeaders() });
  }

}
