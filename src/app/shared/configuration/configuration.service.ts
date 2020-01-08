import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Sport } from './sport';

@Injectable({
  providedIn: 'root'
})

export class ConfigurationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  // HttpClient API get() method => Fetch salles list
  getAllSports(): Observable<Sport> {
    return this.http.get<Sport>(environment.apiUrl + '/sports')
    .pipe(
      retry(1)
    );
  }
}
