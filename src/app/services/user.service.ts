import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    return this.http.get<User>(`${environment.api}/user/${userId}`, {headers: this.getHeaders()})
  }

  modifyInfosUser(id: number, userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${environment.api}/user/${id}`, userData ,{headers : this.getHeaders()})
  }

  deleteUserAccount(id: number): Observable<User> {
    return this.http.delete<User>(`${environment.api}/user/${id}`, { headers: this.getHeaders() });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api}/user`, { headers: this.getHeaders() });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.api}/user/${id}`, { headers: this.getHeaders() });
  }

  getUserConnected(): number {
    const userId = localStorage.getItem('user_id');

    if (userId !== null) {
      const parsedId = parseInt(userId, 10);

      if (!isNaN(parsedId)) {
        return parsedId;
      } else {
        console.error('Stored user_id is not a valid number:', userId);
      }
    } else {
      console.error('No user_id found in local storage.');
    }

    return 0;
  }

  getCurrentUser(): Observable<User> {
    const currentUserId = localStorage.getItem('user_id');
    return this.http.get<User>(`${environment.api}/user/${currentUserId}`, { headers: this.getHeaders() });
  }

}
