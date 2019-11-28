import { Equipe } from './equipe';

export class Joueur {
    id: number;
    nom: string;
    prenom: string;
    sexe: string;
    dateNaissance: string;
    equipes: Equipe[];
}
