import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatChip, DateAdapter, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Lieu } from 'src/app/shared/lieu';
import { Adresse } from 'src/app/shared/adresse';
import { Ville } from 'src/app/shared/ville';
import { Club } from 'src/app/shared/club';
import { VilleService } from 'src/app/shared/ville.service';
import { AdresseService } from 'src/app/shared/adresse.service';
import { LieuService } from 'src/app/shared/lieu.service';

@Component({
  selector: 'app-vue-ajout-salle-club',
  templateUrl: './vue-ajout-salle-club.component.html',
  styleUrls: ['./vue-ajout-salle-club.component.css']
})
export class VueAjoutSalleClubComponent implements OnInit {
    salleForm = new FormGroup({
        nom: new FormControl('')
    });
    
    adresse: Adresse;
    lieu: Lieu;
    ville: Ville;
    
    constructor(
        public dialogRef: MatDialogRef<VueAjoutSalleClubComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public villeService: VilleService,
        public lieuService: LieuService,
        public adresseService: AdresseService
    ) { 
        this.adresse = new Adresse();
        this.lieu = new Lieu();
        this.ville = new Ville();
    }

    ngOnInit() {
    
    }
    
    onSubmit() {
        this.villeService.createVille(this.ville).toPromise().then(
            (dataVille: Ville) => {
                this.adresse.ville = dataVille;
                this.adresseService.createAdresse(this.adresse).toPromise().then(
                    (dataAdresse: Adresse) => {
                        this.lieu.nom = this.salleForm.value.nom;
                        this.lieu.clubSalle = new Club(this.data.club.id);
                        this.lieu.adresse = new Adresse(dataAdresse.id);
                        this.lieu.salle = true;
                        this.lieuService.createLieu(this.lieu).subscribe(
                            success => this.dialogRef.close(),
                            error => alert(error)
                        );
                    }
                );
            }
        );
    }
    
    getAdresse(data){
        this.adresse.numRue = data.properties.housenumber;
        this.adresse.nomRue = data.properties.street;
        this.ville = new Ville();
        this.ville.nom = data.properties.city;
        this.ville.codePostal = data.properties.postcode;
        this.ville.pays = 'FRANCE';
    }
}
