import { Joueur } from './joueur';

export class User {
    email: string;
    name: string;
    photoUrl: string;
    provider: string;
    providerId: string;
    password: string;
    joueur: Joueur;
    constructor(
    ) {}
}
