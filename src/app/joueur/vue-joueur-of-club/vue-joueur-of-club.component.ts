import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {JoueurService} from '../../shared/joueur.service';
import {MatPaginator, MatTableDataSource, MatSort, MatPaginatorIntl} from '@angular/material';
import { Joueur } from 'src/app/shared/joueur';
import { FrenchMatPaginatorIntl } from 'src/app/component/language/frenchmatpaginatorintl';
import { Club } from 'src/app/shared/club';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-vue-joueur-of-club',
  templateUrl: './vue-joueur-of-club.component.html',
  styleUrls: ['./vue-joueur-of-club.component.css'],
  providers: [
      {provide: MatPaginatorIntl, useClass: FrenchMatPaginatorIntl}
  ]
})
export class VueJoueurOfClubComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['nom', 'prenom', 'sexe', 'dateNaissance', 'details'];

    dataTable = new MatTableDataSource<Joueur>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    @Input() club: Club;
    
    nomFilter = new FormControl();
    filteredValues = {
        nom: ''
    };
    
    constructor(
        private route: ActivatedRoute,
        public joueurService: JoueurService
    ) { }

    ngOnInit() {
        // Initialisation des filtres
        this.initialisationFiltres();
    }
    ngAfterViewInit(): void {
        this.loadJoueurs();
    }

    loadJoueurs() {
        this.joueurService.getAllJoueursFromClub(this.club.id).subscribe((data: {}) => {
            this.dataTable.data = data as Joueur[];
        });
        this.dataTable.paginator = this.paginator;
        this.dataTable.sort = this.sort;
        this.dataTable.filterPredicate = (data: Joueur, filtersJson: string) => {
            const searchString = JSON.parse(filtersJson);
            return data.nom.toString().toLowerCase().includes(searchString.nom.toLowerCase()) || 
                data.prenom.toString().toLowerCase().includes(searchString.nom.toLowerCase()) ;
        };
    }
    
    initialisationFiltres() {
        this.nomFilter.valueChanges.subscribe((FilterValue) => {
            this.filtre(FilterValue, 'nom');
        });
    }
    
    filtre(filterValue: string, nomColumn: string) {
        if (filterValue === 'Tous') {
            filterValue = '';
        }
        this.filteredValues[nomColumn] = filterValue;
        this.dataTable.filter = JSON.stringify(this.filteredValues);
        if (this.dataTable.paginator) {
            this.dataTable.paginator.firstPage();
        }
    }

}
