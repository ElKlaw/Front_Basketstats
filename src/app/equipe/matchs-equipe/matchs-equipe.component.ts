import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Equipe } from 'src/app/shared/equipe';
import { Event } from 'src/app/shared/event';

import { EventService } from 'src/app/shared/service/event.service';
import { EquipeService } from 'src/app/shared/service/equipe.service';

@Component({
  selector: 'app-matchs-equipe',
  templateUrl: './matchs-equipe.component.html',
  styleUrls: ['./matchs-equipe.component.css']
})
export class MatchsEquipeComponent implements OnInit {
  matchsByMonthJoue: Map<number,[]>;
  matchsByMonthAVenir: Map<number,[]>;
  equipe: Equipe;

  constructor(
    public eventService: EventService,
    public equipeService: EquipeService
  ) {
    this.matchsByMonthJoue = new Map();
    this.matchsByMonthAVenir = new Map();
    this.getEquipe();
  }

  ngOnInit() {
    this.loadMatchs();
  }

  getEquipe() {
    this.equipeService.equipe$.subscribe((equipe: Equipe) =>{
      this.equipe = equipe;
    })
  }

  loadMatchs() {
    this.eventService.getAllMatchsFromEquipe(this.equipe.id).subscribe((data : any)  => {
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
