import { Ville } from './ville';

export class Adresse {
    constructor(
        public id?: number
    ) {}
    numRue: number;
    nomRue: string;
    longitude: string;
    latitude: string;
    ville: Ville;
}