import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  /*------------------------------- Match --------------------------*/
  //Club
  getProchainsMatchsFromClub(id, nombre): Observable<Event[]> {
    return this.http.get<Event[]>(environment.apiUrl + '/club/' + id + '/matchs?type=FUTUR&size=' + nombre)
    .pipe(
      retry(1)
    );
  }

  getDerniersMatchsFromClub(id, nombre): Observable<Event[]> {
    return this.http.get<Event[]>(environment.apiUrl + '/club/' + id + '/matchs?type=PASSE&size=' + nombre)
    .pipe(
      retry(1)
    );
  }

  getAllMatchsFromClub(id): Observable<Event[]> {
    return this.http.get<Event[]>(environment.apiUrl + '/club/' + id + '/matchs')
    .pipe(
      retry(1)
    );
  }

  //Equipe
  getProchainsMatchsFromEquipe(id, nombre): Observable<Event[]> {
    return this.http.get<Event[]>(environment.apiUrl + '/equipe/' + id + '/matchs?type=FUTUR&size=' + nombre)
    .pipe(
      retry(1)
    );
  }

  getDerniersMatchsFromEquipe(id, nombre): Observable<Event[]> {
    return this.http.get<Event[]>(environment.apiUrl + '/equipe/' + id + '/matchs?type=PASSE&size=' + nombre)
    .pipe(
      retry(1)
    );
  }

  getAllMatchsFromEquipe(id): Observable<Event[]> {
    return this.http.get<Event[]>(environment.apiUrl + '/equipe/' + id + '/matchs')
    .pipe(
      retry(1)
    );
  }
}
