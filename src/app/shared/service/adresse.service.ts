import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Adresse } from '../adresse';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  createAdresse(adresse): Observable<Adresse> {
    return this.http.post<Adresse>(environment.apiUrl + '/adresse', JSON.stringify(adresse), this.httpOptions)
      .pipe(
          retry(1)
      );
  }
}
