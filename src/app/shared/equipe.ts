import { Club } from './club';
import { Photo } from './photo';

export class Equipe {
    constructor(
        public id: number,
        public nom?: string
    ) {}

    saison: number;
    phase: number;
    categorie: string;
    sexe: string;
    niveau: string;
    division: string;
    poule: string;
    club: Club;
    imageequipe: any;
    photo: Photo
}
