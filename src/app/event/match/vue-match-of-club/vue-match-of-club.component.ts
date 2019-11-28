import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EventService} from 'src/app/shared/event.service';
import { groupBy, toArray, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Match } from 'src/app/shared/match';
import { Event } from 'src/app/shared/event';
import { Club } from 'src/app/shared/club';
import * as moment from 'moment';


@Component({
  selector: 'app-vue-match-of-club',
  templateUrl: './vue-match-of-club.component.html',
  styleUrls: ['./vue-match-of-club.component.css']
})
export class VueMatchOfClubComponent implements OnInit {
    matchsByMonthJoue: any[];
    matchsByMonthAVenir: any[];
    @Input() club: Club;
    
    constructor(
        private route: ActivatedRoute,
        public eventService: EventService
    ) {
        this.matchsByMonthJoue = [];
        this.matchsByMonthAVenir = [];
    }

    ngOnInit() {
        this.loadMatchs();
    }

    loadMatchs() {
        this.eventService.getAllMatchsFromClub(this.club.id).subscribe((data : any)  => {
            const matchsJoue = data.content.filter(event => {
                const dateMatch = moment(event.match.dateMatch + ' '+ event.match.heureMatch, 'YYYY-MM-DD HH:mm');
                return dateMatch.isBefore(moment());
            });
            const matchsAVenir = data.content.filter(event => {
                const dateMatch = moment(event.match.dateMatch + ' '+ event.match.heureMatch, 'YYYY-MM-DD HH:mm');
                return dateMatch.isAfter(moment());
            });
            matchsAVenir.sort((event1, event2) => {
                const dateMatch1 = moment(event1.match.dateMatch + ' '+ event1.match.heureMatch, 'YYYY-MM-DD HH:mm');
                const dateMatch2 = moment(event2.match.dateMatch + ' '+ event2.match.heureMatch, 'YYYY-MM-DD HH:mm');
                return  dateMatch1.isBefore(dateMatch2) ? -1 : 1;
            });
            
            matchsJoue.sort((event1, event2) => {
                const dateMatch1 = moment(event1.match.dateMatch + ' '+ event1.match.heureMatch, 'YYYY-MM-DD HH:mm');
                const dateMatch2 = moment(event2.match.dateMatch + ' '+ event2.match.heureMatch, 'YYYY-MM-DD HH:mm');
                return  dateMatch1.isAfter(dateMatch2) ? -1 : 1;
            });
            
            this.matchsByMonthAVenir = matchsAVenir;
            this.matchsByMonthJoue = matchsJoue;
        });
    }
}
