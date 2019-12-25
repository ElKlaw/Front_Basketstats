import { Component, OnInit, Input } from '@angular/core';
import { Club } from 'src/app/shared/club';

@Component({
  selector: 'app-infos-club',
  templateUrl: './infos-club.component.html',
  styleUrls: ['./infos-club.component.css']
})
export class InfosClubComponent implements OnInit {
  @Input() club: Club;
  constructor() {
  }

  ngOnInit() {
  }
}
