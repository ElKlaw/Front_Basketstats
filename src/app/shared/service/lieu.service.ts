import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Lieu } from '../lieu';

@Injectable({
  providedIn: 'root'
})
export class LieuService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  createLieu(lieu): Observable<Lieu> {
    return this.http.post<Lieu>(environment.apiUrl + '/lieu', JSON.stringify(lieu), this.httpOptions)
        .pipe(
            retry(1)
        );
  }

  updateLieu(id, lieu): Observable<Lieu> {
      return this.http.put<Lieu>(environment.apiUrl + '/lieu/' + id, JSON.stringify(lieu), this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  deleteLieu(id) {
      return this.http.delete<Lieu>(environment.apiUrl + '/lieu/' + id, this.httpOptions)
      .pipe(
        retry(1)
      );
  }


  // HttpClient API get() method => Fetch salles list
  getAllSallesFromClub(id): Observable<Lieu> {
      return this.http.get<Lieu>(environment.apiUrl + '/club/' + id + '/salles')
      .pipe(
        retry(1)
      );
  }

  // HttpClient API get() method => Fetch salles list
  getAllSalles(nom): Observable<Lieu> {
      return this.http.get<Lieu>(environment.apiUrl + '/salles?search_query=' + nom, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
}
