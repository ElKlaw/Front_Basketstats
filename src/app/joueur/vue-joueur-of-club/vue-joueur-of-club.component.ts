import { Component, ViewChild, Input, AfterViewInit } from '@angular/core';
import {JoueurService} from '../../shared/joueur.service';
import {MatPaginator, MatTableDataSource, MatSort, MatPaginatorIntl} from '@angular/material';
import { Joueur } from 'src/app/shared/joueur';
import { FrenchMatPaginatorIntl } from 'src/app/component/language/frenchmatpaginatorintl';
import { Club } from 'src/app/shared/club';
import { FormControl } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-vue-joueur-of-club',
  templateUrl: './vue-joueur-of-club.component.html',
  styleUrls: ['./vue-joueur-of-club.component.css'],
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
export class VueJoueurOfClubComponent implements AfterViewInit {
    displayedColumns : string[] = ['nom', 'prenom', 'sexe', 'dateNaissance','detail'];
    dataTable: MatTableDataSource<Joueur>;
    expandedElement: Joueur | null;

    @Input() club: Club;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

    nomFilter = new FormControl();
    filteredValues = {
        nom: ''
    };

    constructor(
        public joueurService: JoueurService
    ) {
      this.dataTable = new MatTableDataSource<Joueur>();
    }

    ngAfterViewInit() {
      this.initialisationFiltres();
      this.loadJoueurs();
    }

    loadJoueurs() {
      this.joueurService.getAllJoueursFromClub(this.club.id).subscribe((data: {}) => {
        this.dataTable.data = data as Joueur[];
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
