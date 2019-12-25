import { Component, OnInit, Input } from '@angular/core';

import {EventService} from 'src/app/shared/event.service';

import { Event } from 'src/app/shared/event';
import { Club } from 'src/app/shared/club';

@Component({
  selector: 'app-infos-match-club',
  templateUrl: './infos-match-club.component.html',
  styleUrls: ['./infos-match-club.component.css']
})
export class InfosMatchClubComponent implements OnInit {
  eventsProchainsMatchs: Event[];
  eventsDerniersMatchs: Event[];
  @Input() club: Club;
  constructor(
    public eventService: EventService
  ) {
      this.eventsProchainsMatchs=[];
      this.eventsDerniersMatchs=[];
  }

  ngOnInit() {
    this.loadMatchs();
  }

  loadMatchs() {
    this.eventService.getProchainsMatchsFromClub(this.club.id, 5).subscribe((data : any)  => {
        this.eventsProchainsMatchs=data.content;
    });
    this.eventService.getDerniersMatchsFromClub(this.club.id, 5).subscribe((data : any)  => {
        this.eventsDerniersMatchs=data.content;
    });
  }
}
