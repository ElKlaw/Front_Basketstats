import { Component, OnInit, Input } from '@angular/core';
import {EventService} from 'src/app/shared/event.service';
import { Club } from 'src/app/shared/club';
import * as moment from 'moment';
import { Match } from 'src/app/shared/match';
import { Event } from 'src/app/shared/event';


@Component({
  selector: 'app-vue-match-of-club',
  templateUrl: './vue-match-of-club.component.html',
  styleUrls: ['./vue-match-of-club.component.css']
})
export class VueMatchOfClubComponent implements OnInit {
    matchsByMonthJoue: Map<number,[]>;
    matchsByMonthAVenir: Map<number,[]>;
    @Input() club: Club;
    
    constructor(
        public eventService: EventService
    ) {
        this.matchsByMonthJoue = new Map();
        this.matchsByMonthAVenir = new Map();
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
            this.matchsByMonthAVenir = this.groupMatchsByMonth(matchsAVenir);
            this.matchsByMonthJoue = this.groupMatchsByMonth(matchsJoue);
        });
    }

    groupMatchsByMonth(listeMatchs){
        let listEventByMonth = new Map();
        listeMatchs.map( 
            (event : Event) =>{
                const monthEvent = moment(event.match.dateMatch,'YYYY-MM-DD','fr').format('MMMM');
                if(listEventByMonth.get(monthEvent)){
                    let eventsOfMonth = listEventByMonth.get(monthEvent);
                    eventsOfMonth.push(event);
                    listEventByMonth.set(monthEvent,eventsOfMonth)
                } else {
                    let eventsOfMonth = [];
                    eventsOfMonth.push(event);
                    listEventByMonth.set(monthEvent,eventsOfMonth);
                }
            }
        )
        return listEventByMonth;
    }
}
