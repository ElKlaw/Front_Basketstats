import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubRoutingModule } from './club-routing.module';

import { ClubComponent } from './club.component'
import { AccueilClubComponent } from './accueil-club/accueil-club.component';
import { ActusClubComponent } from './actus-club/actus-club.component';
import { CalendrierClubComponent } from './calendrier-club/calendrier-club.component';
import { EquipeClubComponent } from './equipe-club/equipe-club.component';
import { EquipesClubComponent } from './equipes-club/equipes-club.component';
import { JoueurClubComponent } from './joueur-club/joueur-club.component';
import { MatchClubComponent } from './match-club/match-club.component';
import { ParametreClubComponent } from './parametre-club/parametre-club.component';

import { InfosActusClubComponent } from './infos-actus-club/infos-actus-club.component';
import { InfosClubComponent } from './infos-club/infos-club.component';
import { InfosMatchClubComponent } from './infos-match-club/infos-match-club.component';

import { HeaderCalendarComponent } from '../calendar/header-calendar/header-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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
    ClubComponent,
    AccueilClubComponent,
    ActusClubComponent,
    CalendrierClubComponent,
    EquipeClubComponent,
    JoueurClubComponent,
    MatchClubComponent,
    ParametreClubComponent,
    InfosActusClubComponent,
    InfosClubComponent,
    InfosMatchClubComponent,
    HeaderCalendarComponent,
    EquipesClubComponent
  ],
  imports: [
    CommonModule,
    ClubRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
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
export class ClubModule {
}
