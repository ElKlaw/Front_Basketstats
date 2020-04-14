import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isConnected());

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isLoggedInValue() {
    return this.loggedIn.value;
  }

  updateUser() {
    if(this.isConnected){
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
  }

  connectUser(user): Observable<any> {
    return this.http.post<User>(environment.apiUrl + '/login', JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  createUser(user): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/signup', JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1)
    );
  }

  deconnectUser(){
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  isConnected(){
    if(localStorage.getItem('token')){
      return true;
    } else {
      return false;
    }
  }

  getCurrentUser(){
    return this.http.get<any>(environment.apiUrl + '/user/me')
    .pipe(
      retry(1)
    );
  }
}
