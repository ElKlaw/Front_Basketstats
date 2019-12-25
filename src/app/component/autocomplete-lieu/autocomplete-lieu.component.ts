import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize, filter } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { LieuService } from 'src/app/shared/lieu.service';

@Component({
  selector: 'app-autocomplete-lieu',
  templateUrl: './autocomplete-lieu.component.html',
  styleUrls: ['./autocomplete-lieu.component.css']
})
export class AutocompleteLieuComponent implements OnInit {
    lieuCtrl = new FormControl();
    filteredAdresses: any;
    filteredSalles: any;

    isLoading = false;
    isLoadingSalle = false;
    isLoadingAdresse = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
    @ViewChild('lieuInput', {static: false}) lieuInput: ElementRef<HTMLInputElement>;
    @Output() eventLieu = new EventEmitter<any>();


    constructor(
        public lieuService: LieuService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.loadAdresses();
        this.loadSalles();
    }

    loadAdresses() {
        this.lieuCtrl.valueChanges.pipe(
            filter((value: string) => (value ? value.length > 2 : false)),
            debounceTime(100),
            tap(() => {
                this.filteredAdresses = [];
                this.isLoadingAdresse = true;
                this.isLoading = true;
            }),
            switchMap(
                value =>
                        this.http.
                            get('https://api-adresse.data.gouv.fr/search/?q=' + value)
                                .pipe(
                                    finalize(() => {
                                        this.isLoadingAdresse = false;
                                        if(!this.isLoadingSalle) this.isLoading = false;
                                    })
                                )
            )
        ).subscribe(
            (data: any) => {
                this.filteredAdresses = data.features;
            }
        );
    }

    loadSalles() {
        this.lieuCtrl.valueChanges.pipe(
            filter((value: string) => (value ? value.length > 2 : false)),
            debounceTime(100),
            tap(() => {
                this.filteredSalles = [];
                this.isLoadingSalle = true;
                this.isLoading = true;
            }),
            switchMap(
                value =>
                       this.lieuService.getAllSalles(value)
                                .pipe(
                                    finalize(() => {
                                        this.isLoadingSalle = false;
                                        if(!this.isLoadingAdresse) this.isLoading = false;
                                    })
                                )
            )
        ).subscribe(
            (data: any) => {
                this.filteredSalles = data;
            }
        );
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.eventLieu.emit(event.option.value);
    }

    displayFn(salle?: any): string | undefined {
        return salle ? salle.nom : undefined;
    }


}
