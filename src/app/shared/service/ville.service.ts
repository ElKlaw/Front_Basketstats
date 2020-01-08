import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Ville } from '../ville';


@Injectable({
  providedIn: 'root'
})
export class VilleService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getVille(id): Observable<Ville> {
    return this.http.get<Ville>(environment.apiUrl + '/ville/' + id)
    .pipe(
      retry(1)
    );
  }

  createVille(ville): Observable<Ville> {
    return this.http.post<Ville>(environment.apiUrl + '/ville', JSON.stringify(ville), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  updateVille(id, ville): Observable<Ville> {
    return this.http.put<Ville>(environment.apiUrl + '/ville/' + id, JSON.stringify(ville), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  deleteVille(id) {
    return this.http.delete<Ville>(environment.apiUrl + '/ville/' + id, this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  getAllVillesFromClub(id): Observable<Ville> {
    return this.http.get<Ville>(environment.apiUrl + '/club/' + id + '/villes')
    .pipe(
      retry(1)
    );
  }
}
