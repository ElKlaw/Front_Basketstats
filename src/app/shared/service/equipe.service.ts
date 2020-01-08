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

  getAllEquipesFromClub(id){
    return this.http.get<Equipe[]>(environment.apiUrl + '/club/' + id + '/equipes')
    .pipe(
      retry(1)
    );
  }
}
