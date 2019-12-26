import { Component, OnInit, Input } from '@angular/core';

import { JoueurService } from 'src/app/shared/service/joueur.service';

import { Equipe } from 'src/app/shared/equipe';
import { Joueur } from 'src/app/shared/joueur';

@Component({
  selector: 'app-infos-joueurs-equipe',
  templateUrl: './infos-joueurs-equipe.component.html',
  styleUrls: ['./infos-joueurs-equipe.component.css']
})
export class InfosJoueursEquipeComponent implements OnInit {
  @Input() equipe: Equipe;
  joueurs: Joueur[];

  constructor(
    public joueurService: JoueurService
  ) {
    this.joueurs= [];
  }

  ngOnInit() {
    this.loadJoueurs();
  }

  loadJoueurs() {
    this.joueurService.getAllJoueursFromEquipe(this.equipe.id).subscribe(joueurs => {
      this.joueurs= joueurs;
    });
  }

}
