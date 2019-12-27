import { Component, OnInit, Input } from '@angular/core';

import {EventService} from 'src/app/shared/service/event.service';

import { Equipe } from 'src/app/shared/equipe';
import { Event } from 'src/app/shared/event';

@Component({
  selector: 'app-infos-matchs-equipe',
  templateUrl: './infos-matchs-equipe.component.html',
  styleUrls: ['./infos-matchs-equipe.component.css']
})
export class InfosMatchsEquipeComponent implements OnInit {
  eventsProchainsMatchs: Event[];
  eventsDerniersMatchs: Event[];
  @Input() equipe: Equipe;

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
    this.eventService.getProchainsMatchsFromEquipe(this.equipe.id, 1).subscribe((data : any)  => {
        this.eventsProchainsMatchs=data.content;
    });
    this.eventService.getDerniersMatchsFromEquipe(this.equipe.id, 5).subscribe((data : any)  => {
        this.eventsDerniersMatchs=data.content;
    });
  }
}
