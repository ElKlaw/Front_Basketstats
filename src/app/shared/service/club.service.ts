import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Club } from '../club';
import { Page } from '../page';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private club = new ReplaySubject<Club>();

  club$ = this.club.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getClubByURL(url){
    this.http.get<Club>(environment.apiUrl + '/club/' + url)
    .pipe(
      retry(1)
    ).subscribe(
      (clubResult: Club) => {
        this.club.next(clubResult);
      }
    );
  }

  searchClub(nom, page, size) {
    return this.http.get<Page>(environment.apiUrl + '/clubs/results?search_query=' + nom + '&page=' + page + '&size=' + size , this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  createClub(club): Observable<Club> {
    return this.http.post<Club>(environment.apiUrl + '/club', JSON.stringify(club), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  patchClub(id, club): Observable<Club> {
    return this.http.patch<Club>(environment.apiUrl + '/club/' + id, JSON.stringify(club), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  updateClub(id, club): Observable<Club> {
    return this.http.put<Club>(environment.apiUrl + '/club/' + id, JSON.stringify(club), this.httpOptions)
    .pipe(
      retry(1)
    );
  }
}
