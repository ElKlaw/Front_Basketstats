import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import {EquipeService} from 'src/app/shared/service/equipe.service';

import { Equipe } from 'src/app/shared/equipe';

@Component({
  selector: 'app-equipes-club',
  templateUrl: './equipes-club.component.html',
  styleUrls: ['./equipes-club.component.css']
})
export class EquipesClubComponent implements OnInit {
  equipes: Equipe[];
  equipesFilter: Equipe[];

  // filter
  nomFilter = new FormControl();

  constructor(
      public equipeService: EquipeService
  ) {
    this.nomFilter.valueChanges.subscribe(
      (value: string) =>{
        this.equipesFilter = this.equipes.filter(equipe => equipe.nom.toLowerCase().includes(value.toLowerCase()));
      }
    )
  }

  ngOnInit(): void {
    this.loadEquipes();
  }

  loadEquipes() {
    this.equipeService.equipes$.subscribe((equipes: Equipe[]) => {
        this.equipes = equipes;
        this.equipesFilter = this.equipes;
    });
  }

}
