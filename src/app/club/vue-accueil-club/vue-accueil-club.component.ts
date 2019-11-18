import { Component, OnInit, Input } from '@angular/core';
import { Club } from 'src/app/shared/club';

@Component({
  selector: 'app-vue-accueil-club',
  templateUrl: './vue-accueil-club.component.html',
  styleUrls: ['./vue-accueil-club.component.css']
})
export class VueAccueilClubComponent implements OnInit {
  @Input() club: Club;
  constructor() { }

  ngOnInit() {
  }

}
