import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Joueur } from '../joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getAllJoueursFromEquipe(id): Observable<Joueur[]> {
    return this.http.get<Joueur[]>(environment.apiUrl + '/equipe/' + id + '/joueurs')
    .pipe(
      retry(1)
    );
  }

  getAllJoueursFromClub(id): Observable<Joueur[]> {
    return this.http.get<Joueur[]>(environment.apiUrl + '/club/' + id + '/joueurs')
    .pipe(
      retry(1)
    );
  }

  getJoueur(id): Observable<Joueur> {
    return this.http.get<Joueur>(environment.apiUrl + '/joueur/' + id)
    .pipe(
      retry(1)
    );
  }

  createJoueur(joueur): Observable<Joueur> {
    return this.http.post<Joueur>(environment.apiUrl + '/joueur', JSON.stringify(joueur), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  updateJoueur(id, joueur): Observable<Joueur> {
    return this.http.put<Joueur>(environment.apiUrl + '/joueur/' + id, JSON.stringify(joueur), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  deleteJoueur(id) {
    return this.http.delete<Joueur>(environment.apiUrl + '/joueur/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }

}
