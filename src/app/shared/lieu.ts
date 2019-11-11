import { Adresse } from './adresse';
import { Club } from './club';

export class Lieu {
    constructor(
        public id?: number
    ) {}
    nom: string;
    salle: boolean;
    adresse: Adresse;
    clubSalle: Club;
}