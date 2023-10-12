import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from '../models/favorite';
import { MeditationTechnique } from '../models/meditation-technique';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private bddUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }


  addFavorite(userId: number, meditationTechniqueId: number): Observable<Favorite> {
    return this.http.post<Favorite>(`${this.bddUrl}/favorite`, { userId, meditationTechniqueId }, {headers: this.getHeaders()});
  }

  removeFavorite(favoriteId: number): Observable<Favorite> {
    return this.http.delete<Favorite>(`${this.bddUrl}/favorite/${favoriteId}`, { headers: this.getHeaders() });
  }

  getUserFavorites(userId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.bddUrl}/favorite/user/${userId}`, { headers: this.getHeaders() });
  }

}
