import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { ClubService } from 'src/app/shared/service/club.service';
import { EventService } from 'src/app/shared/service/event.service';

import { Club } from 'src/app/shared/club';
import { Event } from 'src/app/shared/event';

@Component({
  selector: 'app-match-club',
  templateUrl: './match-club.component.html',
  styleUrls: ['./match-club.component.css']
})
export class MatchClubComponent {
  matchsByMonthJoue: Map<number,[]>;
  matchsByMonthAVenir: Map<number,[]>;

  matchsJoue: Event[];
  matchsAVenir : Event[];

  club: Club;

  loading = true;

  constructor(
    public eventService: EventService,
    public clubService: ClubService,
    public route: ActivatedRoute
  ) {
    this.getClub();
  }

  getClub() {
    this.route.parent.data.subscribe(
      (data: any) =>{
        this.club = data.club;
        this.loadMatchs();
      }
    );
  }

  loadMatchs() {
    this.eventService.getAllMatchsFromClub(this.club.id).subscribe((data : any)  => {
      this.matchsJoue = data.content.filter(event => {
        const dateMatch = moment(event.match.dateMatch + ' '+ event.match.heureMatch, 'YYYY-MM-DD HH:mm');
        return dateMatch.isBefore(moment());
      });
      this.matchsAVenir = data.content.filter(event => {
        const dateMatch = moment(event.match.dateMatch + ' '+ event.match.heureMatch, 'YYYY-MM-DD HH:mm');
        return dateMatch.isAfter(moment());
      });

      this.matchsAVenir.sort((event1, event2) => {
        const dateMatch1 = moment(event1.match.dateMatch + ' '+ event1.match.heureMatch, 'YYYY-MM-DD HH:mm');
        const dateMatch2 = moment(event2.match.dateMatch + ' '+ event2.match.heureMatch, 'YYYY-MM-DD HH:mm');
        return  dateMatch1.isBefore(dateMatch2) ? -1 : 1;
      });
      this.matchsJoue.sort((event1, event2) => {
        const dateMatch1 = moment(event1.match.dateMatch + ' '+ event1.match.heureMatch, 'YYYY-MM-DD HH:mm');
        const dateMatch2 = moment(event2.match.dateMatch + ' '+ event2.match.heureMatch, 'YYYY-MM-DD HH:mm');
        return  dateMatch1.isAfter(dateMatch2) ? -1 : 1;
      });

      this.matchsByMonthAVenir = this.groupMatchsByMonth(this.matchsAVenir);
      this.matchsByMonthJoue = this.groupMatchsByMonth(this.matchsJoue);
      this.loading=false;
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
