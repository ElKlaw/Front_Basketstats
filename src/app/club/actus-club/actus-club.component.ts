import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/shared/club';
import { ClubService } from 'src/app/shared/service/club.service';

@Component({
  selector: 'app-actus-club',
  templateUrl: './actus-club.component.html',
  styleUrls: ['./actus-club.component.css']
})
export class ActusClubComponent implements OnInit {
  club: Club;

  constructor(
    public clubService: ClubService
  ) { }

  ngOnInit() {
    this.getClub();
  }

  getClub() {
    this.clubService.club$.subscribe((club: Club) =>{
      this.club = club;
    });
  }
}
