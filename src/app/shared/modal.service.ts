import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalInscriptionComponent } from '../modal/modal-inscription/modal-inscription.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    public dialog: MatDialog
  ) { }
    
  openInscriptionModal() {
    const dialogInscription = this.dialog.open(ModalInscriptionComponent, {
        width: '30%'
    });
  }
}
