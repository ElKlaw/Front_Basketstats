import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Photo } from '../photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(
    private http: HttpClient
  ) { }

  getPhotoById(id){
    return this.http.get(environment.apiUrl + '/photo/' + id, {responseType: 'blob'})
    .pipe(
      retry(1)
    );
  }

  addPhoto(photo, urlclub: string, nom: string): Observable<Photo> {
    const data: FormData = new FormData();
    data.append('image', photo._files[0]);
    data.append('urlClub',urlclub);
    data.append('nom',nom);
    return this.http.post<Photo>(environment.apiUrl + '/photo', data)
    .pipe(
      retry(1)
    );
  }
}
