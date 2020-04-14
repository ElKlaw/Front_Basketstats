import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-inscription',
  templateUrl: './modal-inscription.component.html',
  styleUrls: ['./modal-inscription.component.css']
})
export class ModalInscriptionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalInscriptionComponent>
  ) { }

  ngOnInit() {
  }

  fermerModal() {
    this.dialogRef.close();
  }

}
