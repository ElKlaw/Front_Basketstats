import { Component, ViewChild, Input, AfterViewInit } from '@angular/core';
import {EquipeService} from '../../shared/equipe.service';
import {MatPaginator, MatSort, MatDialog, MatPaginatorIntl} from '@angular/material';
import { Equipe } from 'src/app/shared/equipe';
import { Club } from 'src/app/shared/club';
import { VueCreateEquipeComponent } from '../vue-create-equipe/vue-create-equipe.component';
import { FrenchMatPaginatorIntl } from 'src/app/component/language/frenchmatpaginatorintl';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-vue-equipe-of-club',
  templateUrl: './vue-equipe-of-club.component.html',
  styleUrls: ['./vue-equipe-of-club.component.css'],
  providers: [
      {provide: MatPaginatorIntl, useClass: FrenchMatPaginatorIntl}
  ]
})
export class VueEquipeOfClubComponent implements AfterViewInit {
    equipes: Equipe[];

    @Input() club: Club;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

    // filter
    nomFilter = new FormControl();

    constructor(
        public equipeService: EquipeService,
        public dialog: MatDialog
    ) {
    }

    ngAfterViewInit() {
        this.loadEquipes();
    }

    loadEquipes() {
        this.equipeService.getAllEquipesFromClub(this.club.id).subscribe((data: {}) => {
            this.equipes = data as Equipe[];
        });
    }

    openCreateEquipeDialog() {
        const dialogCreateEquipe = this.dialog.open(VueCreateEquipeComponent, {
            width: '50%',
            data: {club: this.club}
        });

        dialogCreateEquipe.afterClosed().subscribe(result => {
            this.loadEquipes();
        });
    }
}
