import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private bddUrl = 'http://localhost:3000/user';
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getUserProfile(): Observable<User> {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      throw new Error('Pas id utilisateur trouvé')
    }
    return this.http.get<User>(`${this.bddUrl}/${userId}`, {headers: this.getHeaders()})
  }
}
