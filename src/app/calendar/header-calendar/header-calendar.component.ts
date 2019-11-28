import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DAYS_OF_WEEK } from 'angular-calendar';

@Component({
  selector: 'app-header-calendar',
  templateUrl: './header-calendar.component.html',
  styleUrls: ['./header-calendar.component.css']
})
export class HeaderCalendarComponent implements OnInit {
  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale = 'fr';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
  
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  constructor() { }

  ngOnInit() {
  }

}
