import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { ClubService } from 'src/app/shared/service/club.service';
import { PhotoService } from 'src/app/shared/service/photo.service';
import { VilleService } from 'src/app/shared/service/ville.service';
import { ConfigurationService } from 'src/app/shared/configuration/configuration.service';

import { Ville } from 'src/app/shared/ville';
import { Sport } from 'src/app/shared/configuration/sport';
import { Photo } from 'src/app/shared/photo';

interface RetourApi {
    nom: string;
    code: number;
}

@Component({
  selector: 'app-creer-club',
  templateUrl: './creer-club.component.html',
  styleUrls: ['./creer-club.component.css']
})
export class CreerClubComponent implements OnInit {

  clubForm = new FormGroup({
    nomcomplet: new FormControl(''),//,{validators : [Validators.required, Validators.minLength(3), Validators.maxLength(200)], updateOn: 'blur'}),
    nom: new FormControl(''),//,{validators : [Validators.required, Validators.minLength(2), Validators.maxLength(200)], updateOn: 'blur'}),
    url: new FormControl(''),//,{validators : [Validators.required, Validators.minLength(3), Validators.maxLength(15)]}),
    codeClub: new FormControl(''),//,{validators : [Validators.required, Validators.minLength(2), Validators.maxLength(50)], updateOn: 'blur'}),
    sport: new FormControl(''),//,{validators : [Validators.required], updateOn: 'blur'}),
    villes: new FormControl(''),
    imagelogo: new FormControl(''),
    imagefond: new FormControl(''),
    logo: new FormControl(''),
    fond: new FormControl('')
  });
  // Enum Sport (Basket, ...)
  sports: Sport[] = [];
  villesApi: any;
  ville: Ville;
  urlexist: boolean;
  isLoading = false;

  constructor(
    public photoService: PhotoService,
    public clubService: ClubService,
    public villeService: VilleService,
    public configurationService: ConfigurationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadConfiguration();
  }

  // convenience getter for easy access to form fields
  get f() { return this.clubForm.controls; }

  onSubmit() {
    this.clubForm.value.villes = this.addVilles();
    const promiseFond = this.addPhotoFond();
    const promiseLogo = this.addPhotoLogo();
    Promise.all([promiseLogo,promiseFond]).then(data =>{
      this.clubForm.value.logo = data[0];
      this.clubForm.value.fond = data[1];
      this.clubForm.value.url = this.clubForm.value.url.toLowerCase();
      console.log(JSON.stringify(this.clubForm.value));
      this.clubService.createClub(this.clubForm.value).subscribe(
        data => this.router.navigate(['/club/' + data.url]),
        error => console.log(error)
      );
    });
  }

  addVilles() {
    let villes = new Array();
    this.ville = new Ville();
    for(let villeApi of this.villesApi) {
      this.ville.nom = villeApi.nom;
      if (villeApi.departement != null) {
          this.ville.codeDepartement = villeApi.departement.code;
          this.ville.departement = villeApi.departement.nom;
      }
      this.ville.codePostal = villeApi.codesPostaux[0];
      this.ville.region = villeApi.region.nom;
      this.ville.pays = 'FRANCE';
      this.villeService.createVille(this.ville).subscribe(
        (data: Ville) => {
          villes.push(data)
        }
      );
    };
    return villes;
  }

  addPhotoFond() {
    return new Promise((resolve, reject) => {
      this.photoService.addPhoto(this.clubForm.value.imagefond, this.clubForm.value.url, 'fond').subscribe(
        (photo: Photo)=> {
          resolve(new Photo(photo.id));
        }
      );
    });
  }

  addPhotoLogo() {
    return new Promise((resolve, reject) => {
      this.photoService.addPhoto(this.clubForm.value.imagelogo, this.clubForm.value.url, 'logo').subscribe(
        (photo: Photo)=> {
          resolve(new Photo(photo.id));
        }
      );
    });
  }

  getVilles(data) {
      this.villesApi = data;
  }

  loadConfiguration() {
      return this.configurationService.getAllSports().subscribe((data: {}) => {
          this.sports = data as Sport[];
      });
  }

  isExistURL(){
      this.clubService.existUrlClub(this.clubForm.value.url.toLowerCase()).subscribe(
          data => {if(data) this.f.url.setErrors({'urlexist': true});}
      )
  }
}
