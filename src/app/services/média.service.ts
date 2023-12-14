import { Injectable } from '@angular/core';
import { Média } from '../models/média';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MédiaService {
  image: Média[]=[];


  private bddUrl='http://localhost:3000/media';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getMédia() {
    return this.http.get(`${this.bddUrl}`, {
      responseType: 'blob',
    }), {headers: this.getHeaders()};
  }

  getMédiaById(id: number) {
    return this.http.get(`${environment.api}/media/${id}`, {
      responseType: 'blob',
      headers: this.getHeaders(),
    }).pipe(
      tap(data => console.log('Réponse du média:', data)),
      catchError(err => {
        console.error('Erreur lors de la récupération du média:', err);
        throw err;
      }),
    );
  }

  postMédia(formData: FormData) {
    return this.http.post(`${environment.api}/media`, formData, {headers: this.getHeaders()});
  }

  deleteMédia(id: number) {

    return this.http.delete(`${environment.api}/api/photos/${id}`, {headers: this.getHeaders()});
  }


}
