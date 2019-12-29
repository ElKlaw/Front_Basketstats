import { Component, ViewChild, AfterViewInit } from '@angular/core';

import {MatPaginator, MatTableDataSource, MatSort, MatPaginatorIntl} from '@angular/material';
import { FrenchMatPaginatorIntl } from 'src/app/component/language/frenchmatpaginatorintl';
import { FormControl } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {ClubService} from 'src/app/shared/service/club.service';
import {JoueurService} from 'src/app/shared/service/joueur.service';

import { Club } from 'src/app/shared/club';
import { Joueur } from 'src/app/shared/joueur';

@Component({
  selector: 'app-joueur-club',
  templateUrl: './joueur-club.component.html',
  styleUrls: ['./joueur-club.component.css'],
  providers: [
      {provide: MatPaginatorIntl, useClass: FrenchMatPaginatorIntl}
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class JoueurClubComponent implements AfterViewInit {
  displayedColumns = ['nom', 'prenom', 'sexe', 'dateNaissance','detail'];
  dataTable: MatTableDataSource<Joueur>;
  expandedElement: Joueur | null;

  club: Club;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  nomFilter = new FormControl();
  filteredValues = {
      nom: ''
  };

  constructor(
    public clubService: ClubService,
    public joueurService: JoueurService
  ) {
    this.dataTable = new MatTableDataSource<Joueur>();
    this.getClub();
  }

  ngAfterViewInit() {
    this.initialisationFiltres();
    this.loadJoueurs();
  }

  getClub() {
    this.clubService.club$.subscribe((club: Club) =>{
      this.club = club;
    });
  }

  loadJoueurs() {
    this.joueurService.getAllJoueursFromClub(this.club.id).subscribe((joueurs: Joueur[]) => {
      this.dataTable.data = joueurs;
      this.dataTable.paginator = this.paginator;
      this.dataTable.sort = this.sort;
      this.dataTable.filterPredicate = (data: Joueur, filtersJson: string) => {
        const searchString = JSON.parse(filtersJson);
        return data.nom.toString().toLowerCase().includes(searchString.nom.toLowerCase()) ||
            data.prenom.toString().toLowerCase().includes(searchString.nom.toLowerCase()) ;
      };
    });
  }

  initialisationFiltres() {
    this.nomFilter.valueChanges.subscribe((FilterValue) => {
      this.filtre(FilterValue, 'nom');
    });
  }

  filtre(filterValue: string, nomColumn: string) {
    this.filteredValues[nomColumn] = filterValue;
    this.dataTable.filter = JSON.stringify(this.filteredValues);
    if (this.dataTable.paginator) {
      this.dataTable.paginator.firstPage();
    }
  }
}
