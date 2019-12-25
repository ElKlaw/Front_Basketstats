import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import { Router} from '@angular/router';
import { ConfigurationService } from 'src/app/shared/configuration/configuration.service';
import { VueAjoutSalleClubComponent } from 'src/app/salle/vue-ajout-salle-club/vue-ajout-salle-club.component';

import { LieuService } from 'src/app/shared/lieu.service';
import { ClubService } from 'src/app/shared/service/club.service';
import { VilleService } from 'src/app/shared/ville.service';

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
  @Output() eventClub: EventEmitter<Club> = new EventEmitter();
  salles: Lieu[]=[];
  villes: Ville[]=[]
  sports: Sport[] = [];
  clubForm = new FormGroup({
      nomcomplet: new FormControl(''),
      nom: new FormControl(''),
      url: new FormControl(''),
      codeClub: new FormControl(''),
      sport: new FormControl('')
  });

  constructor(
      public clubService: ClubService,
      public lieuService: LieuService,
      public villeService: VilleService,
      public dialogAjoutSalle: MatDialog,
      public configurationService: ConfigurationService,
      private router: Router,
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

  loadSalle() {
      this.lieuService.getAllSallesFromClub(this.club.id).subscribe((data: any) => {
          this.salles = data as Lieu[];
      });
  }

  loadVille(){
      this.villeService.getAllVillesFromClub(this.club.id).subscribe((data: any)=> {
          this.villes= data as Ville[];
      })
  }

  supprimerVille(ville) {
      this.villeService.deleteVille(ville.id).subscribe((data: any) => {
          this.loadVille();
      });
  }

  supprimerSalle(salle) {
      this.lieuService.deleteLieu(salle.id).subscribe((data: any) => {
          this.loadSalle();
      });
  }

  openCreateSalleClub() {
      const dialogModifEvent = this.dialogAjoutSalle.open(VueAjoutSalleClubComponent, {
          width: '50%',
          data: {club: this.club}
      });

      dialogModifEvent.afterClosed().subscribe(result => {
          this.loadSalle();
      });
  }

  onSubmit(){
      this.clubService.patchClub(this.club.id, this.clubForm.value).subscribe(
          data => this.refresh(data),
          error => console.log(error)
      );
  }

  refresh(club){
      this.router.navigate(['/club/' + club.url ]);
      this.club = club;
      this.eventClub.emit(this.club);
  }

  loadConfiguration() {
      return this.configurationService.getAllSports().subscribe((data: {}) => {
          this.sports = data as Sport[];
      });
  }

  openCreateVille(){
      const dialogCreateVille = this.dialog.open(VueAjoutSalleClubComponent, {
          width: '50%',
          data: {club: this.club}
      });

      dialogCreateVille.afterClosed().subscribe(result => {

      });
  }

  openCreateSalle(){
      const dialogCreateSalle = this.dialog.open(VueAjoutSalleClubComponent, {
          width: '50%',
          data: {club: this.club}
      });

      dialogCreateSalle.afterClosed().subscribe(result => {
          this.loadSalle();
      });
  }

}
