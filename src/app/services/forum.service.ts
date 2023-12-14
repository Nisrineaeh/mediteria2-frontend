import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forum } from '../models/forum';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


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
    return this.http.get<Forum[]>(`${environment.api}/forum/technique/${techniqueId}`, { headers: this.getHeaders() });
  }

  addMessageForum(forum: Forum): Observable<Forum> {
    console.log('Le comments', forum)
    return this.http.post<Forum>(`${environment.api}/forum`, forum, { headers: this.getHeaders() });
  }

  deleteMessage(forumId: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/forum/${forumId}`, { headers: this.getHeaders() });
  }

}
