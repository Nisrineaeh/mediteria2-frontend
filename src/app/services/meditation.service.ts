import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeditationTechnique } from '../models/meditation-technique';

@Injectable({
  providedIn: 'root'
})
export class MeditationService {
  private bddUrl = 'http://localhost:3000/meditation-technique'
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
    return this.http.get<MeditationTechnique[]>(`${this.bddUrl}`, {headers: this.getHeaders()});
  }
}