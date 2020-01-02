import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

import { AjoutSalleComponent } from 'src/app/modal/salle/ajout-salle/ajout-salle.component';
import { AjoutVilleComponent } from 'src/app/modal/ville/ajout-ville/ajout-ville.component';

import { LieuService } from 'src/app/shared/lieu.service';
import { ClubService } from 'src/app/shared/service/club.service';
import { VilleService } from 'src/app/shared/ville.service';
import { ConfigurationService } from 'src/app/shared/configuration/configuration.service';

import { Ville } from 'src/app/shared/ville';
import { Sport } from 'src/app/shared/configuration/sport';
import { Club } from 'src/app/shared/club';
import { Lieu } from 'src/app/shared/lieu';

@Component({
  selector: 'app-parametre-club',
  templateUrl: './parametre-club.component.html',
  styleUrls: ['./parametre-club.component.css']
})
export class ParametreClubComponent implements OnInit {
  club: Club;
  salles: Lieu[]=[];
  villes: Ville[]=[]
  sports: Sport[] = [];

  clubNomForm = new FormGroup({
    nomcomplet: new FormControl(''),
    nom: new FormControl('')
  });

  clubUrlForm = new FormGroup({
    url: new FormControl('')
  });

  clubCodeForm = new FormGroup({
    codeClub: new FormControl('')
  });

  clubSportForm = new FormGroup({
    sport: new FormControl('')
  });

  constructor(
      public clubService: ClubService,
      public lieuService: LieuService,
      public villeService: VilleService,
      public dialogAjoutSalle: MatDialog,
      public configurationService: ConfigurationService,
      public dialog: MatDialog
  ) {
    this.getClub();
  }

  ngOnInit() {
      this.loadSalle();
      this.loadVille();
      this.loadConfiguration();
  }

  getClub() {
    this.clubService.club$.subscribe((club: Club) =>{
      this.club = club;
    });
  }

  loadConfiguration() {
    return this.configurationService.getAllSports().subscribe((data: {}) => {
      this.sports = data as Sport[];
    });
  }

  //Submit form
  submit(form){
    this.clubService.patchClub(this.club.id, form.value);
  }


  // Gestion Salle
  loadSalle() {
    this.lieuService.getAllSallesFromClub(this.club.id).subscribe((data: any) => {
        this.salles = data as Lieu[];
    });
  }

  supprimerSalle(salle) {
    this.lieuService.deleteLieu(salle.id).subscribe((data: any) => {
        this.loadSalle();
    });
  }

  openCreateSalle(){
    const dialogCreateSalle = this.dialog.open(AjoutSalleComponent, {
        width: '50%',
        data: {club: this.club}
    });

    dialogCreateSalle.afterClosed().subscribe(result => {
        this.loadSalle();
    });
  }

  // Gestion Ville
  loadVille(){
      this.villeService.getAllVillesFromClub(this.club.id).subscribe((data: any)=> {
          this.villes= data as Ville[];
      })
  }

  supprimerVille(ville) {
    let listeVille = new Array();
    this.club.villes.map((data: Ville) => {
      if(data.id != ville.id){
        listeVille.push(data);
      }
    });
    this.club.villes = listeVille;
    this.clubService.updateClub(this.club);
  }

  openCreateVille(){
    const dialogCreateVille = this.dialog.open(AjoutVilleComponent, {
        width: '50%',
        data: {club: this.club}
    });

    dialogCreateVille.afterClosed().subscribe(result => {
      this.loadVille();
    });
  }
}
