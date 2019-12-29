import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject, Subject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Equipe } from '../equipe';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private equipes = new ReplaySubject<Equipe[]>();
  private equipe = new Subject<Equipe>();

  equipes$ = this.equipes.asObservable();
  equipe$ = this.equipe.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getEquipe(id){
    this.http.get<Equipe>(environment.apiUrl + '/equipe/' + id)
    .pipe(
      retry(1)
    ).subscribe(
      (equipe: Equipe) => {
        this.equipe.next(equipe);
      }
    );
  }

  getAllEquipesFromClub(id){
    this.http.get<Equipe[]>(environment.apiUrl + '/club/' + id + '/equipes')
    .pipe(
      retry(1)
    ).subscribe(
      (equipes: Equipe[]) => {
        this.equipes.next(equipes);
      }
    );
  }
}
