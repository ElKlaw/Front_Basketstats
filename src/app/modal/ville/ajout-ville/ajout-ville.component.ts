import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Ville } from 'src/app/shared/ville';

import { VilleService } from 'src/app/shared/service/ville.service';
import { ClubService } from 'src/app/shared/service/club.service';

@Component({
  selector: 'app-ajout-ville',
  templateUrl: './ajout-ville.component.html',
  styleUrls: ['./ajout-ville.component.css']
})
export class AjoutVilleComponent implements OnInit {
  villeForm = new FormGroup({
    ville: new FormControl('')
  });

  ville: Ville;

  constructor(
    public dialogRef: MatDialogRef<AjoutVilleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public villeService: VilleService,
    public clubService: ClubService
  ) {
  }

  ngOnInit() {
  }

  getVille(data) {
    this.ville = data;
  }

  onSubmit() {
    this.villeService.createVille(this.ville).toPromise().then(
      (dataVille: Ville) => {
        this.data.club.villes.push(dataVille);
        this.clubService.updateClub(this.data.club);
        this.dialogRef.close();
      }
    );
  }

}
