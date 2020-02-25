import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Equipe } from 'src/app/shared/equipe';

import { EquipeService } from 'src/app/shared/service/equipe.service';
import { PhotoService } from 'src/app/shared/service/photo.service';

@Component({
  selector: 'app-profil-equipe',
  templateUrl: './profil-equipe.component.html',
  styleUrls: ['./profil-equipe.component.css']
})
export class ProfilEquipeComponent implements OnInit {
  equipe: Equipe;

  constructor(
    private route: ActivatedRoute,
    public equipeService: EquipeService,
    public photoService: PhotoService
  ) {
    this.getEquipe();
  }

  ngOnInit() {

  }

  getEquipe() {
    this.equipeService.getEquipe(this.route.snapshot.paramMap.get('id')).subscribe((equipe: Equipe) => {
      this.equipe = equipe;
      this.getImageEquipe(equipe);
    });
  }

  getImageEquipe(equipe : Equipe) {
    this.photoService.getPhotoById(equipe.photo.id).subscribe(
      image => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          equipe.imageequipe = reader.result;
        }, false);

        if (image) {
          reader.readAsDataURL(image);
        }
      }
    );
  }
}
