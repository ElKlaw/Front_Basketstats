import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ClubService } from '../service/club.service';

@Injectable({
  providedIn: 'root'
})
export class ClubResolverService implements Resolve<any> {
  constructor(
    private clubService : ClubService
  ) { }

  resolve(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ) {
    let url = route.paramMap.get('url');
    return this.clubService.getClubByURL(url);
  }
}
