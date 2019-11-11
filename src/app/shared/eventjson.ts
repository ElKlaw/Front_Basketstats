import { Equipe } from './equipe';
import { Club } from './club';
import { Match } from './match';
import { Lieu } from './lieu';

export class EventJson {
    id: number;
    title: string;
    dateDebut: string;
    dateFin: string;
    infosSup: string;
    typeEvent: string;
    equipes: Equipe[];
    club: Club;
    recurent: boolean;
    freq: string;
    bymonth: string;
    bymonthday: string;
    byweekday: string;
    match: Match;
    lieu: Lieu;
}
