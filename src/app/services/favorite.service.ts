import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Favorite } from '../models/favorite';
import { MeditationTechnique } from '../models/meditation-technique';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private bddUrl = 'http://localhost:3000'
  private _favoriteUpdated = new Subject<void>();

  constructor(private http: HttpClient) { }

  // Observable pour les autres composants à écouter
  favoriteUpdated$ = this._favoriteUpdated.asObservable();

  // Méthode pour émettre un événement lorsque les favoris sont mis à jour
  notifyFavoriteUpdated() {
    this._favoriteUpdated.next();
  }

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
