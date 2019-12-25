import { Component, OnInit } from '@angular/core';

import {ClubService} from 'src/app/shared/service/club.service';

import {Club} from 'src/app/shared/club';

@Component({
  selector: 'app-accueil-club',
  templateUrl: './accueil-club.component.html',
  styleUrls: ['./accueil-club.component.css']
})
export class AccueilClubComponent implements OnInit {
  club: Club;

  constructor(
    public clubService: ClubService
  ) {
    this.getClub();
  }

  ngOnInit() {

  }

  getClub() {
    this.clubService.club$.subscribe((club: Club) =>{
      this.club = club;
    });
  }
}
