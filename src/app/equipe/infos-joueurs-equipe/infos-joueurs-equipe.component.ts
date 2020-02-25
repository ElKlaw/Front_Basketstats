import { Component, OnInit, Input } from '@angular/core';

import { JoueurService } from 'src/app/shared/service/joueur.service';
import { PhotoService } from 'src/app/shared/service/photo.service';

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
    public photoService: PhotoService,
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
      joueurs.forEach( (joueur :Joueur)=> {
        if(joueur.photo){
          this.getImageJoueur(joueur);
        }
      });
    });
  }

  getImageJoueur(joueur : Joueur) {
    this.photoService.getPhotoById(joueur.photo.id).subscribe(
      image => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          joueur.imagejoueur = reader.result;
        }, false);

        if (image) {
          reader.readAsDataURL(image);
        }
      }
    );
  }

}
