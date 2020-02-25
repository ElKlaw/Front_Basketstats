import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { EnumCategory } from 'src/app/shared/enum/enumcategory';
import { EnumNiveau } from 'src/app/shared/enum/enumniveau';
import { EnumSaison } from 'src/app/shared/enum/enumsaison';
import { EnumSexeEquipe } from 'src/app/shared/enum/enumsexeequipe';

import { EquipeService } from 'src/app/shared/service/equipe.service';
import { PhotoService } from 'src/app/shared/service/photo.service';

import { Photo } from 'src/app/shared/photo';

@Component({
  selector: 'app-ajout-equipe',
  templateUrl: './ajout-equipe.component.html',
  styleUrls: ['./ajout-equipe.component.css']
})
export class AjoutEquipeComponent implements OnInit {
  // Enum Niveau ( U9, U11)
  niveaux = EnumNiveau;
  keysNiveaux = [];
  // Enum Saison (2017/2018, ...)
  saisons = EnumSaison;
  keysSaisons = [];

  // Enum Sexe Equipe (Féminine ou Masculine)
  sexes = EnumSexeEquipe;
  keysSexes = [];

  // Enum Categorie ( Départemental,...)
  categories = EnumCategory;
  keysCategories = [];

  // Form
  equipeForm = new FormGroup({
      nom: new FormControl(''),
      saison: new FormControl(''),
      categorie: new FormControl(''),
      sexe: new FormControl(''),
      niveau: new FormControl(''),
      division: new FormControl(''),
      poule: new FormControl(''),
      imageequipe: new FormControl(''),
      photo: new FormControl('')
  });

  constructor(
      public equipeService: EquipeService,
      public dialogRef: MatDialogRef<AjoutEquipeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public photoService: PhotoService,
      private router: Router
  ) {
      this.keysCategories = Object.keys(this.categories);
      this.keysNiveaux = Object.keys(this.niveaux);
      this.keysSaisons = Object.keys(this.saisons);
      this.keysSexes = Object.keys(this.sexes);
  }

  ngOnInit() {
  }

  onSubmit() {
    const promiseLogo = this.addPhotoEquipe();
    promiseLogo.then(data => {
      this.equipeForm.value.photo = data;
      this.equipeService.createEquipeFromClub(this.equipeForm.value, this.data.club.id).subscribe(
        equipe => {
          this.dialogRef.close();
          this.router.navigate(['/club/'+this.data.club.url+'/equipe/'+ equipe.id]);
        },
        error => alert(error)
      );
    });
  }

  addPhotoEquipe() {
    return new Promise((resolve, reject) => {
      this.photoService.addPhoto(this.equipeForm.value.imageequipe, this.data.club.url, this.equipeForm.value.nom).subscribe(
        (photo: Photo)=> {
          resolve(new Photo(photo.id));
        }
      );
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
