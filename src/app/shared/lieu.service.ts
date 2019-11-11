import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lieu } from '../shared/lieu';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LieuService {
    // Define API
    apiURL = 'http://localhost:8080';
    
    constructor(private http: HttpClient) { }
    
    /*========================================
        CRUD Methods for consuming RESTful API
    =========================================*/
    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };

    createLieu(lieu): Observable<Lieu> {
        return this.http.post<Lieu>(this.apiURL + '/lieu', JSON.stringify(lieu), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }
    updateLieu(id, lieu): Observable<Lieu> {
        return this.http.put<Lieu>(this.apiURL + '/lieu/' + id, JSON.stringify(lieu), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    deleteLieu(id) {
        return this.http.delete<Lieu>(this.apiURL + '/lieu/' + id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    
    // HttpClient API get() method => Fetch salles list
    getAllSallesFromClub(id): Observable<Lieu> {
        return this.http.get<Lieu>(this.apiURL + '/club/' + id + '/salles')
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    // HttpClient API get() method => Fetch salles list
    getAllSalles(nom): Observable<Lieu> {
        return this.http.get<Lieu>(this.apiURL + '/salles?search_query=' + nom, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }
    
    // Error handling
    handleError(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     //window.alert(errorMessage);
     return throwError(error);
    }
}