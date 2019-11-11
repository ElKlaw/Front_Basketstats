import { Equipe } from './equipe';
import { Club } from './club';
import { Lieu } from './lieu';
import { Match } from './match';

export class Event {
    freq: any;
    bymonth: number;
    bymonthday: number;
    byweekday: any;
    recurent: boolean;
    clubs: Club[];
    equipes: Equipe[];
    lieu: Lieu;
    match: Match;
    constructor(
        public id: number,
        public title: string,
        public start: Date,
        public end: Date,
        public infosSup: string,
        public type: string
    ) {}
}
