import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Adresse } from '../shared/adresse';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdresseService {
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
    // HttpClient API post() method => Create salle
    createAdresse(adresse): Observable<Adresse> {
        return this.http.post<Adresse>(this.apiURL + '/adresse', JSON.stringify(adresse), this.httpOptions)
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