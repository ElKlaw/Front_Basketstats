import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {ClubService} from '../shared/service/club.service';
import { EquipeService } from '../shared/service/equipe.service';

import {Club} from 'src/app/shared/club';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  club: Club;

  constructor(
    private route: ActivatedRoute,
    public clubService: ClubService,
    public equipeService: EquipeService
  ) { }

  ngOnInit() {
    this.getClub();
  }

  getClub() {
    this.clubService.club$.subscribe((club: Club) =>{
      this.club = club;
      this.equipeService.getAllEquipesFromClub(this.club.id);
    });
    this.clubService.getClubByURL(this.route.snapshot.paramMap.get('url'));
  }
}
