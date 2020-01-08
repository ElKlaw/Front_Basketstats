import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  title: 'Confirmer votre action ?';
}

@Component({
  selector: 'app-confirmer-action',
  templateUrl: './confirmer-action.component.html',
  styleUrls: ['./confirmer-action.component.css']
})
export class ConfirmerActionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmerActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

}
