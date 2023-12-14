import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MeditationTechnique } from '../models/meditation-technique';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private bddUrl = 'http://localhost:3000'
  private _favoriteUpdated = new Subject<void>();

  constructor(private http: HttpClient) { }

 
  favoriteUpdated$ = this._favoriteUpdated.asObservable();

  
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


  addFavorite(userId: number, meditationTechniqueId: number): Observable<any> {
    return this.http.post<any>(`${environment.api}/user/${userId}/favorites/${meditationTechniqueId}`, {}, { headers: this.getHeaders() });
  }

  removeFavorite(userId:number, meditationTechniqueId: number): Observable<any> {
    return this.http.delete<any>(`${environment.api}/user/${userId}/favorites/${meditationTechniqueId}`, { headers: this.getHeaders() });
  }

  getUserFavorites(userId: number): Observable<MeditationTechnique[]> {
    return this.http.get<MeditationTechnique[]>(`${environment.api}/user/${userId}/favorites`, { headers: this.getHeaders() });
  }



}
