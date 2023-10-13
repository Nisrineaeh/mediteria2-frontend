import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private bddUrl = 'http://localhost:3000/comment'

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getCommentsByTechnique(techniqueId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.bddUrl}/technique/${techniqueId}`, {headers:this.getHeaders()});
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.bddUrl}`, comment, { headers: this.getHeaders() });
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.bddUrl}/${commentId}`,  { headers: this.getHeaders() });
  }


}
