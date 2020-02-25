import { Equipe } from './equipe';
import { Photo } from './photo';

export class Joueur {
    id: number;
    nom: string;
    prenom: string;
    sexe: string;
    dateNaissance: string;
    equipes: Equipe[];
    imagejoueur: any;
    photo: Photo
}
