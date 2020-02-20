import { Component, AfterViewInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventService } from 'src/app/shared/service/event.service';
import { enumTypeEvent } from 'src/app/shared/enum/enumtypeevent';
import { DateAdapter, MatAutocomplete, MatAutocompleteSelectedEvent, MatChip, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { EventJson } from 'src/app/shared/eventjson';
import { EquipeService } from 'src/app/shared/service/equipe.service';
import { Equipe } from 'src/app/shared/equipe';
import { Match } from 'src/app/shared/match';
import { Club } from 'src/app/shared/club';
import { Lieu } from 'src/app/shared/lieu';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-modal-create-event',
  templateUrl: './modal-create-event.component.html',
  styleUrls: ['./modal-create-event.component.css']
})
export class ModalCreateEventComponent implements AfterViewInit {

    eventForm = new FormGroup({
        match: new FormGroup({
            equipe: new FormControl(''),
            adversaire:  new FormControl(''),
            lieu: new FormControl(''),
            domicile: new FormControl('')
        }),
        title: new FormControl(''),
        startDate: new FormControl(''),
        startTime: new FormControl(''),
        endDate: new FormControl(''),
        endTime: new FormControl(''),
        infosSup: new FormControl(''),
        type: new FormControl(''),
        recurent: new FormControl('')
    });

    separatorKeysCodes: number[] = [ENTER, COMMA];
    typeEvents = enumTypeEvent;
    keysTypeEvent = [];
    equipes: any = [];
    joursSelected = [];

    //Autre
    domicileCtrl = new FormControl();
    equipeAutreCtrl = new FormControl();
    filteredAutreEquipes: Observable<Equipe[]>;
    @ViewChild('equipeAutreInput', {static: false}) equipeAutreInput: ElementRef<HTMLInputElement>;
    hiddenReccurentAutre: boolean;
    lieuAutre: Lieu;

    //Match
    filteredMatchEquipes: Observable<Equipe[]>;
    @ViewChild('equipeMatchInput', {static: false}) equipeMatchInput: ElementRef<HTMLInputElement>;
    lieuMatch: Lieu;

    //Entrainement
    equipeEntrainementCtrl = new FormControl();
    filteredEntrainementEquipes: Observable<Equipe[]>;
    @ViewChild('equipeEntrainementInput', {static: false}) equipeEntrainementInput: ElementRef<HTMLInputElement>;
    hiddenReccurentEntrainement: boolean;
    equipesEntrainementEvent: any = [];
    equipesEntrainementNotEvent: any = [];
    lieuEntrainement: Lieu;


    constructor(
        public eventService: EventService,
        public equipeService: EquipeService,
        private adapter: DateAdapter<any>,
        public dialogRef: MatDialogRef<ModalCreateEventComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.keysTypeEvent = Object.keys(this.typeEvents);
        this.adapter.setLocale('fr');
        this.hiddenReccurentEntrainement = true;
        this.hiddenReccurentAutre = true;
        this.lieuMatch = new Lieu();
        this.lieuEntrainement = new Lieu();
        this.lieuAutre = new Lieu();
    }


    /*---------- INITIALISATION --------------*/
    ngAfterViewInit() {
        this.loadEquipes();
        this.initFilteredValue();
    }

    loadEquipes() {
        let idClub: number;
        if (this.data.club != null) {
            idClub = this.data.club.id;
        } else {
            idClub = this.data.equipe.club.id;
        }
        this.equipeService.getAllEquipesFromClub(idClub).subscribe((data: {}) => {
            this.equipes = data as Equipe[];
            this.equipesEntrainementNotEvent = data as Equipe[];
            this.initFilteredValue();
        });
    }

    initFilteredValue() {
        this.filteredMatchEquipes = this.eventForm.get('match').get('equipe').valueChanges
        .pipe(
            startWith(null),
            map((equipe: string | null) => equipe ? this._filterMatchEquipes(equipe) : this.equipes.slice())
        );

        this.filteredEntrainementEquipes = this.equipeEntrainementCtrl.valueChanges
        .pipe(
            startWith(null),
            map((equipe: string | null) => equipe ? this._filterEntrainementEquipes(equipe) : this.equipes.slice())
        );
    }

    changeType($event){
        this.joursSelected = [];
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    displayFn(equipe?: Equipe): string | undefined {
        return equipe ? equipe.nom : undefined;
    }

    /*---------- AFFICHAGE ------*/
    onChangeRecurrentEntrainement(event) {
        this.hiddenReccurentEntrainement = !event.checked;
    }

    onChangeRecurrentAutre(event) {
        this.hiddenReccurentAutre = !event.checked;
    }


    private _filterMatchEquipes(value: string): Equipe[] {
        const filterValue = value.toLowerCase();
        return this.equipes.filter(equipe => equipe.nom.toLowerCase().includes(filterValue));
    }

    private _filterEntrainementEquipes(value: string): Equipe[] {
        const filterValue = value.toLowerCase();
        return this.equipesEntrainementNotEvent.filter(equipe => equipe.nom.toLowerCase().includes(filterValue));
    }

    removeEquipeEntrainement(equipe: Equipe): void {
        const index = this.equipesEntrainementEvent.indexOf(equipe);
        if (index >= 0) {
            this.equipesEntrainementNotEvent.push(this.equipesEntrainementEvent[index]);
            this.equipesEntrainementEvent.splice(index, 1);
        }
        this.initFilteredValue();
    }

    selectedEquipeEntrainement(event: MatAutocompleteSelectedEvent): void {
        this.equipesEntrainementEvent.push(event.option.value);
        const index = this.equipesEntrainementNotEvent.indexOf(event.option.value);
        this.equipesEntrainementNotEvent.splice(index, 1);
        this.initFilteredValue();
        this.equipeEntrainementInput.nativeElement.value = '';
        this.equipeEntrainementCtrl.setValue(null);
    }



    selectChip(item: MatChip) {
        item.toggleSelected();
        if (item.selected) {
            this.joursSelected.push(item.value);
        } else {
            const index = this.joursSelected.indexOf(item.value);
            this.joursSelected.splice(index, 1);
        }
    }

    /*---------- SUBMIT ---------*/

    onSubmit() {
        this.createEvent(this.eventForm.value.type);
    }

    createEvent(typeEvent){
        switch(this.eventForm.value.type){
            case 'MATCH' : {
                const matchs = new Match();
                matchs.dateMatch =  new Date(this.eventForm.value.startDate);
                matchs.heureRDV = this.eventForm.value.startTime.toString();
                matchs.heureMatch = this.eventForm.value.endTime.toString();
                matchs.adversaire = this.eventForm.value.match.adversaire;
                matchs.domicile = this.eventForm.value.match.domicile;
                matchs.infosSup = this.eventForm.value.infosSup;
                matchs.equipe = new Equipe(this.eventForm.value.match.equipe.id);
                this.eventService.createMatch(matchs).toPromise().then(
                    (data: Match) => {
                        // init Date
                        const dateDebut = new Date(this.eventForm.value.startDate);
                        const dateFin = new Date(this.eventForm.value.startDate);

                        // init heure
                        const heureDebut = this.eventForm.value.startTime.toString();
                        dateDebut.setHours(parseInt(heureDebut.substring(0, 2))-(dateDebut.getTimezoneOffset())/60, heureDebut.substring(3, 5));
                        const heureFin = this.eventForm.value.endTime.toString();
                        dateFin.setHours(parseInt(heureFin.substring(0, 2))-((dateFin.getTimezoneOffset())/60) + 2 , heureFin.substring(3, 5));


                        const jsonEvent = new EventJson();
                        jsonEvent.title = this.eventForm.value.title;
                        jsonEvent.dateDebut = moment(dateDebut).toISOString();
                        jsonEvent.dateFin = moment(dateFin).toISOString();
                        jsonEvent.infosSup = this.eventForm.value.infosSup;
                        jsonEvent.typeEvent = this.eventForm.value.type;
                        jsonEvent.recurent = this.eventForm.value.recurent;
                        jsonEvent.match = new Match();
                        jsonEvent.match.id = data.id;
                        jsonEvent.equipes = new Array();
                        jsonEvent.equipes.push(new Equipe(this.eventForm.value.match.equipe.id));
                        jsonEvent.recurent = false;
                        jsonEvent.lieu = new Lieu(this.lieuMatch.id);
                        this.eventService.createEvent(jsonEvent).subscribe(
                            success => this.dialogRef.close(true),
                            error => alert(error)
                        );
                    }
                );
                break;
            }
            case 'ENTRAINEMENT' : {
                // init Date debut
                const dateDebut = new Date(this.eventForm.value.startDate);
                const heureDebut = this.eventForm.value.startTime.toString();
                dateDebut.setHours(parseInt(heureDebut.substring(0, 2))-(dateDebut.getTimezoneOffset())/60, heureDebut.substring(3, 5));
                // init Date fin
                const dateFin = new Date(this.eventForm.value.endDate);
                const heureFin = this.eventForm.value.endTime.toString();
                dateFin.setHours(parseInt(heureFin.substring(0, 2))-(dateFin.getTimezoneOffset())/60, heureFin.substring(3, 5));

                // create JSON
                const jsonEvent = new EventJson();
                jsonEvent.title = this.eventForm.value.title;
                jsonEvent.dateDebut = moment(dateDebut).toISOString();
                jsonEvent.dateFin = moment(dateFin).toISOString();
                jsonEvent.infosSup = this.eventForm.value.infosSup;
                jsonEvent.typeEvent = this.eventForm.value.type;
                this.equipesEntrainementEvent.map(a => '{id :' + a.id +'}');
                jsonEvent.equipes = this.equipesEntrainementEvent.map(a => new Equipe(a.id));
                jsonEvent.recurent = this.eventForm.value.recurent;
                if (this.eventForm.value.recurent) {
                    jsonEvent.freq = 'WEEKLY';
                    jsonEvent.byweekday = this.joursSelected.toString();
                }
                this.eventService.createEvent(jsonEvent).subscribe(
                    success => this.dialogRef.close(true),
                    error => alert(error)
                );
                break;
            }
            case 'AUTRE': {
                // init Date debut
                const dateDebut = new Date(this.eventForm.value.startDate);
                const heureDebut = this.eventForm.value.startTime.toString();
                dateDebut.setHours(parseInt(heureDebut.substring(0, 2))-(dateDebut.getTimezoneOffset())/60, heureDebut.substring(3, 5));
                let dateFin = new Date();
                if(this.eventForm.value.recurent){
                    // init Date fin
                    dateFin = new Date(this.eventForm.value.endDate);
                    const heureFin = this.eventForm.value.endTime.toString();
                    dateFin.setHours(parseInt(heureFin.substring(0, 2))-(dateFin.getTimezoneOffset())/60, heureFin.substring(3, 5));
                } else {
                    dateFin = new Date(this.eventForm.value.startDate);
                    const heureFin = this.eventForm.value.endTime.toString();
                    dateFin.setHours(parseInt(heureFin.substring(0, 2))-(dateFin.getTimezoneOffset())/60, heureFin.substring(3, 5));
                }
                // create JSON
                const jsonEvent = new EventJson();
                jsonEvent.title = this.eventForm.value.title;
                jsonEvent.dateDebut = moment(dateDebut).toISOString();
                jsonEvent.dateFin = moment(dateFin).toISOString();
                jsonEvent.infosSup = this.eventForm.value.infosSup;
                jsonEvent.typeEvent = this.eventForm.value.type;
                jsonEvent.clubs = new Array();
                jsonEvent.clubs.push(new Club(this.data.club.id));
                jsonEvent.recurent = this.eventForm.value.recurent;
                jsonEvent.lieu = new Lieu(this.lieuAutre.id);
                if (this.eventForm.value.recurent) {
                    jsonEvent.freq = 'WEEKLY';
                    jsonEvent.byweekday = this.joursSelected.toString();
                }
                this.eventService.createEvent(jsonEvent).subscribe(
                    success => this.dialogRef.close(true),
                    error => alert(error)
                );
                break;
            }
        }
    }

    getLieuMatch(data){
        this.lieuMatch.id = data.id;
    }

    getLieuAutre(data){
        this.lieuAutre.id = data.id;
    }

    getLieuEntrainement(data){
        this.lieuEntrainement.id = data.id;
    }
}
