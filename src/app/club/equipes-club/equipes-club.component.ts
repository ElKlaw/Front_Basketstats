import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import {EquipeService} from 'src/app/shared/service/equipe.service';

import { Equipe } from 'src/app/shared/equipe';
import { Club } from 'src/app/shared/club';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipes-club',
  templateUrl: './equipes-club.component.html',
  styleUrls: ['./equipes-club.component.css']
})
export class EquipesClubComponent{

  equipes: Equipe[];
  equipesFilter: Equipe[];
  club: Club;

  // filter
  nomFilter = new FormControl();

  loading = true;

  constructor(
    public equipeService: EquipeService,
    public route: ActivatedRoute
  ) {
    this.nomFilter.valueChanges.subscribe(
      (value: string) =>{
        this.equipesFilter = this.equipes.filter(equipe => equipe.nom.toLowerCase().includes(value.toLowerCase()));
      }
    )
    this.getClub();
  }

  getClub() {
    this.route.parent.data.subscribe(
      (data: any) =>{
        this.club = data.club;
        this.loadEquipes();
      }
    );
  }

  loadEquipes() {
    this.equipeService.getAllEquipesFromClub(this.club.id).subscribe((equipes: Equipe[]) => {
      this.equipes = equipes;
      this.equipesFilter = this.equipes;
      this.loading=false;
    });
  }

}
