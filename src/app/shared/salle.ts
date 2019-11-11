import { Lieu } from './lieu';
import { Club } from './club';

export class Salle {
    constructor(
        public nom?: string
    ) {}
    id: number;
    lieu: Lieu;
    clubSalle: Club;
}