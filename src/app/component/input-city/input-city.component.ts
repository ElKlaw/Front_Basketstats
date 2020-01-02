import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { filter, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Ville } from 'src/app/shared/ville';


@Component({
  selector: 'app-input-city',
  templateUrl: './input-city.component.html',
  styleUrls: ['./input-city.component.css']
})
export class InputCityComponent implements OnInit {
  villeCtrl = new FormControl('');
  filteredVilles: any;
  isLoading = false;
  villesChoisi: any = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ville: Ville;

  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  @ViewChild('villeInput', {static: false}) villeInput: ElementRef<HTMLInputElement>;
  @Output() eventVille = new EventEmitter<any>();

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadVilles();
  }

  loadVilles() {
    this.villeCtrl.valueChanges.pipe(
        filter((value: string) => (value ? value.length > 2 : false)),
        debounceTime(100),
        tap(() => {
            this.filteredVilles = [];
            this.isLoading = true;
        }),
        switchMap(
            value => this.http.
            get('https://geo.api.gouv.fr/communes?nom=' + value + '&fields=nom,codesPostaux,departement,region&format=json')
                .pipe(
                    finalize(() => {
                        this.isLoading = false;
                    }),
                )
        )
    ).subscribe(
        data => {
            this.filteredVilles = data;
        }
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const villeApi =event.option.value;
    this.ville = new Ville();
    this.ville.nom = villeApi.nom;
    if (villeApi.departement != null) {
        this.ville.codeDepartement = villeApi.departement.code;
        this.ville.departement = villeApi.departement.nom;
    }
    this.ville.codePostal = villeApi.codesPostaux[0];
    this.ville.region = villeApi.region.nom;
    this.ville.pays = 'FRANCE';
    this.eventVille.emit(this.ville);
  }

  displayFn(ville?: any): string | undefined {
    return ville ? ville.nom + ' ('+ ville.departement.code +')' : undefined;
  }

}
