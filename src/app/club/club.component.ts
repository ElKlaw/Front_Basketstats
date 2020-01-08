import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {ClubService} from '../shared/service/club.service';

import {Club} from 'src/app/shared/club';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent {
  club: Club;
  constructor(
    public clubService: ClubService,
    private route: ActivatedRoute
  ) {
    this.getClub();
  }

  getClub() {
    this.route.data.subscribe(
      (data: any) =>{
        this.club = data.club;
      }
    );
  }
}
