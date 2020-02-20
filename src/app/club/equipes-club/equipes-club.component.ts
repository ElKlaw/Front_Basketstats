import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {EquipeService} from 'src/app/shared/service/equipe.service';

import { Equipe } from 'src/app/shared/equipe';
import { Club } from 'src/app/shared/club';

import { AjoutEquipeComponent } from 'src/app/modal/equipe/ajout-equipe/ajout-equipe.component';


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
    public route: ActivatedRoute,
    public dialog: MatDialog
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

  openCreateEquipe(){
    const dialogCreateSalle = this.dialog.open(AjoutEquipeComponent, {
      width: '50%',
      data: {club: this.club}
    });

    dialogCreateSalle.afterClosed().subscribe(result => {
      this.loadEquipes();
    });
  }

}
