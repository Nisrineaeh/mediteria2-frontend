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
    const userId = +localStorage.getItem('user_id')!;
    if (!userId) {
      throw new Error('Pas id utilisateur trouvé')
    }
    return this.http.get<User>(`${this.bddUrl}/${userId}`, {headers: this.getHeaders()})
  }

  modifyInfosUser(id: number, userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.bddUrl}/${id}`, userData ,{headers : this.getHeaders()})
  }

  deleteUserAccount(id: number): Observable<any> {
    return this.http.delete(`${this.bddUrl}/${id}`, { headers: this.getHeaders() });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.bddUrl}`, { headers: this.getHeaders() });
  }
}
