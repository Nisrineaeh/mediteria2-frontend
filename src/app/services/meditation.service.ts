import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeditationTechnique } from '../models/meditation-technique';

@Injectable({
  providedIn: 'root'
})
export class MeditationService {
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



  getAllMeditations(): Observable<MeditationTechnique[]> {
    return this.http.get<MeditationTechnique[]>(`${this.bddUrl}/meditation-technique`, {headers: this.getHeaders()});
  }

  getMeditationById(id: number): Observable<MeditationTechnique> {
    return this.http.get<MeditationTechnique>(`${this.bddUrl}/meditation-technique/${id}`, {headers: this.getHeaders()});
  }

  getMédiaUrl(mediaId: number): string {
    return `${this.bddUrl}/media/${mediaId}`;
  }

  addMeditation(méditation: any): Observable<any> {
    console.log('MEDITATION ENVOYER',méditation)
    return this.http.post(`${this.bddUrl}/meditation-technique`, méditation, { headers : this.getHeaders()});
  }

  getMeditationsByUserId(userId: number): Observable<MeditationTechnique[]> {
    return this.http.get<MeditationTechnique[]>(`${this.bddUrl}/meditation-technique/user/${userId}`, {headers: this.getHeaders()});
  }

  updateMeditation(id: number, meditation: MeditationTechnique): Observable<MeditationTechnique> {
    return this.http.patch<MeditationTechnique>(`${this.bddUrl}/meditation-technique/${id}`, meditation, {headers: this.getHeaders()});
  }
  deleteMeditation(id: number): Observable<any> {
    return this.http.delete(`${this.bddUrl}/meditation-technique/${id}`, {headers: this.getHeaders()});
  }


}
