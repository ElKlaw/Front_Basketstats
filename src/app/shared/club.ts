import { Ville } from './ville';
import { Salle } from './salle';
import { Photo } from './photo';

export class Club {
    constructor(
        public id?: number
    ) { }
    nomcomplet: string;
    url: string;
    nom: string;
    codeClub: string;
    sport: string;
    villes: Ville[];
    salles: Salle[];
    fond: Photo;
    logo: Photo;
    imagefont: any;
    imagelogo: any;
}
