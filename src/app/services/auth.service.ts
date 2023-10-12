import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private bddUrl = 'http://localhost:3000'
  currentUser!: User;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<{ access_token: string, user_id: number, sub: string }>(this.bddUrl + '/auth/login', { username, password })
      .pipe(
        tap(response => {
          // console.log(response)
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('username', response.sub);
          console.log('username co stocker', response.sub)
          if (response.user_id && Number.isFinite(response.user_id)) {
            localStorage.setItem('user_id', `${response.user_id}`);
            console.log('Id utilisateur stocké:', localStorage.getItem('user_id'))
            console.log(typeof response.user_id)
          } else {
            console.error('mauvais user Id');
          }
        })
      );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:3000/auth/register',
      user
    );
  }




}
