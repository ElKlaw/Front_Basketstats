import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
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

}
