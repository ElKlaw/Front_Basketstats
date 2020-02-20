import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Equipe } from '../equipe';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getEquipe(id){
    return this.http.get<Equipe>(environment.apiUrl + '/equipe/' + id)
    .pipe(
      retry(1)
    );
  }

  getMesEquipes() {
    return this.http.get<Equipe>(environment.apiUrl + '/mesequipes')
    .pipe(
      retry(1)
    );
  }

  getAllEquipesFromClub(id){
    return this.http.get<Equipe[]>(environment.apiUrl + '/club/' + id + '/equipes')
    .pipe(
      retry(1)
    );
  }

  createEquipe(equipe) {
    return this.http.post<Equipe>(environment.apiUrl + '/equipe', JSON.stringify(equipe), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  createEquipeFromClub(equipe, id) {
    return this.http.post<Equipe>(environment.apiUrl + '/club/' + id + '/equipe', JSON.stringify(equipe), this.httpOptions)
    .pipe(
      retry(1)
    );
  }
  updateEquipe(id, equipe) {
    return this.http.put<Equipe>(environment.apiUrl + '/equipe/' + id, JSON.stringify(equipe), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  deleteEquipe(id) {
    return this.http.delete<Equipe>(environment.apiUrl + '/equipe/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }
}
