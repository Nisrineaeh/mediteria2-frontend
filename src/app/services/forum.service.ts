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
