import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/shared/match';
import { Event } from 'src/app/shared/event';
import { Club } from 'src/app/shared/club';
import {EventService} from 'src/app/shared/event.service';

@Component({
  selector: 'app-vue-block-match-of-club',
  templateUrl: './vue-block-match-of-club.component.html',
  styleUrls: ['./vue-block-match-of-club.component.css']
})
export class VueBlockMatchOfClubComponent implements OnInit {
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
