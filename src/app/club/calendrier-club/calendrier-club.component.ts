import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarDateFormatter, DAYS_OF_WEEK, CalendarEventTimesChangedEvent} from 'angular-calendar';
import { CustomDateFormatter } from 'src/app/calendar/custom-date-formatter.provider';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { EventService } from 'src/app/shared/service/event.service';
import { ClubService } from 'src/app/shared/service/club.service';

import { Club } from 'src/app/shared/club';
import { Event } from 'src/app/shared/event';

import { ModalCreateEventComponent } from 'src/app/modal/modal-create-event/modal-create-event.component';
import { ModalModificationEventComponent } from 'src/app/modal/modal-modification-event/modal-modification-event.component';
import { ModalEditEventClubComponent } from 'src/app/modal/modal-edit-event-club/modal-edit-event-club.component';


@Component({
  selector: 'app-calendrier-club',
  templateUrl: './calendrier-club.component.html',
  styleUrls: ['./calendrier-club.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendrierClubComponent implements OnInit {

  @ViewChild('modalContent', {static: false}) modalContent: TemplateRef<any>;
  club: Club;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  viewDate: Date = new Date();
  locale = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  events$: Observable<Array<CalendarEvent<{ eventDb: Event }>>>;
  eventsAffiches: any;

  dateAffiche: Date = new Date();
  refresh: Subject<any> = new Subject();
  activeDayIsOpen = false;

  constructor(
      public eventService: EventService,
      public dialogCreateEvent: MatDialog,
      public dialogConfirmerModifEvent: MatDialog,
      public dialogEditEventClub: MatDialog,
      public clubService: ClubService,
      public route: ActivatedRoute
  ) {
    this.getClub();
  }

  ngOnInit() {
      this.loadEvents();
  }

  getClub() {
    this.route.parent.data.subscribe(
      (data: any) =>{
        this.club = data.club;
      }
    );
  }

  loadEvents() {
      const id = this.club.id;
      this.events$ = this.eventService.getAllEventsFromClub(id);
      this.events$.subscribe((data: any) =>{
          const eventsAffiches = [];
          data.map((event: any) => {
              if(moment(event.start).isSame(new Date(), 'day')||moment(event.end).isSame(new Date(), 'day')){
                  eventsAffiches.push(event);
              }
          });
          this.eventsAffiches = eventsAffiches;
      });
  }

  /* ---------------- Fonctions utiles ------------ */

  setView(view: CalendarView) {
      this.view = view;
  }

  // event
  eventClicked({ event }: { event: Event }): void {
      console.log('Event clicked', event);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      this.dateAffiche = date;
      this.eventsAffiches = events;
  }

  dayClickedWeek({date}: { date: Date}): void {
      this.dateAffiche = date;
  }

  modificationHoraire({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
      this.openModifEvent(event, newStart, newEnd);
  }

  openCreateEvent() {
      const dialogEquipe = this.dialogCreateEvent.open(ModalCreateEventComponent, {
          width: '50%',
          data: {club: this.club}
      });

      dialogEquipe.afterClosed().subscribe(result => {
          if(result){
              this.refreshView();
              this.loadEvents();
          }
      });
  }

  openModifEvent(event, newStart, newEnd) {
      const dialogModifEvent = this.dialogConfirmerModifEvent.open(ModalModificationEventComponent, {
          width: '50%',
          data: {event: event, newStart: newStart, newEnd: newEnd }
      });

      dialogModifEvent.afterClosed().subscribe(result => {
          if(result){
              this.refreshView();
              this.loadEvents();
          }
      });
  }

  openEditEventClub(event) {
      const dialogEditEventClub = this.dialogEditEventClub.open(ModalEditEventClubComponent, {
          width: '50%',
          data: {event: event}
      });

      dialogEditEventClub.afterClosed().subscribe(result => {
          if(result){
              this.refreshView();
              this.loadEvents();
          }
      });
  }

  refreshView(): void {
      this.refresh.next();
  }

}
