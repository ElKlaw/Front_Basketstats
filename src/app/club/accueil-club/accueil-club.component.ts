import { Component, OnInit } from '@angular/core';

import {ClubService} from 'src/app/shared/service/club.service';

import {Club} from 'src/app/shared/club';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accueil-club',
  templateUrl: './accueil-club.component.html',
  styleUrls: ['./accueil-club.component.css']
})
export class AccueilClubComponent implements OnInit {
  club: Club;

  constructor(
    public clubService: ClubService,
    public route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.getClub();
  }

  getClub() {
    this.route.parent.data.subscribe(
      (data: any) =>{
        this.club = data.club;
      }
    );
  }
}
