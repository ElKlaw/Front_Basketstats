import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar-header',
  template: `
    <div class="row text-center">
      <div>
        <div
          mwlCalendarPreviousView
          [view]="view"
          [(viewDate)]="viewDate"
          (viewDateChange)="viewDateChange.next(viewDate)"
        >
          <<
        </div>
        <h3>{{ viewDate | calendarDate: view + 'ViewTitle':locale }}</h3>
        <div
          mwlCalendarNextView
          [view]="view"
          [(viewDate)]="viewDate"
          (viewDateChange)="viewDateChange.next(viewDate)"
        >
          >>
        </div>
      </div>
      <!--<div>
        <div class="btn-group">
          <div
            class="btn btn-primary"
            (click)="viewChange.emit('month')"
            [class.active]="view === 'month'"
          >
            Mois
          </div>
          <div
            class="btn btn-primary"
            (click)="viewChange.emit('week')"
            [class.active]="view === 'week'"
          >
            Semaine
          </div>
          <div
            class="btn btn-primary"
            (click)="viewChange.emit('day')"
            [class.active]="view === 'day'"
          >
            Jour
          </div>
        </div>
      </div>-->
    </div>
    <br />
  `
})
export class CalendarHeaderComponent {
    @Input() view: string;

    @Input() viewDate: Date;

    @Input() locale = 'fr';

    @Output() viewChange: EventEmitter<string> = new EventEmitter();

    @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}
