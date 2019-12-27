import { Component, OnInit, Input } from '@angular/core';

import {EventService} from 'src/app/shared/service/event.service';

import { Equipe } from 'src/app/shared/equipe';
import { Event } from 'src/app/shared/event';

@Component({
  selector: 'app-infos-events-equipe',
  templateUrl: './infos-events-equipe.component.html',
  styleUrls: ['./infos-events-equipe.component.css']
})
export class InfosEventsEquipeComponent implements OnInit {
  @Input() equipe: Equipe;
  events: Event[];

  constructor(
    public eventService: EventService
  ) {
    this.events= [];
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {

  }
}
