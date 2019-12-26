import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipeRoutingModule } from './equipe-routing.module';

import { EquipeComponent } from './equipe.component';
import { ProfilEquipeComponent } from './profil-equipe/profil-equipe.component';
import { CalendrierEquipeComponent } from './calendrier-equipe/calendrier-equipe.component';
import { MatchsEquipeComponent } from './matchs-equipe/matchs-equipe.component';
import { JoueursEquipeComponent } from './joueurs-equipe/joueurs-equipe.component';

import { InfosEventsEquipeComponent} from './infos-events-equipe/infos-events-equipe.component';
import { InfosJoueursEquipeComponent} from './infos-joueurs-equipe/infos-joueurs-equipe.component';
import { InfosMatchsEquipeComponent } from './infos-matchs-equipe/infos-matchs-equipe.component';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    EquipeComponent,
    ProfilEquipeComponent,
    CalendrierEquipeComponent,
    MatchsEquipeComponent,
    JoueursEquipeComponent,
    InfosJoueursEquipeComponent,
    InfosMatchsEquipeComponent,
    InfosEventsEquipeComponent
  ],
  imports: [
    CommonModule,
    EquipeRoutingModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EquipeModule { }
