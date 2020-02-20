import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
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
import { MaterialFileInputModule } from 'ngx-material-file-input';

// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';

// Routing module for router service
import { AppRoutingModule } from './app-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FlatpickrModule } from 'angularx-flatpickr';

//Interceptor
import { AuthGuard } from './shared/guard/authguard';
import { AuthInterceptor } from './shared/authInterceptor';

//
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

// Component utilitaire
import { AutocompletecityComponent } from './component/autocompletecity/autocompletecity.component';
import { AutocompleteAdresseComponent } from './component/autocomplete-adresse/autocomplete-adresse.component';

// Clubs
import { CreerClubComponent } from './club/creer-club/creer-club.component';
import { SearchClubComponent } from './club/search-club/search-club.component';

// Accueil
import { AccueilComponent } from './autres/accueil/accueil.component';
import { FaqComponent } from './autres/faq/faq.component';
import { FonctionnalitesComponent } from './autres/fonctionnalites/fonctionnalites.component';

// Modal
import { AjoutSalleComponent } from './modal/salle/ajout-salle/ajout-salle.component';
import { AjoutVilleComponent } from './modal/ville/ajout-ville/ajout-ville.component';
import { ConfirmerActionComponent } from './modal/confirmation/confirmer-action/confirmer-action.component';
import { InputCityComponent } from './component/input-city/input-city.component';
import { AjoutEquipeComponent } from './modal/equipe/ajout-equipe/ajout-equipe.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SearchClubComponent,
    CreerClubComponent,
    AccueilComponent,
    FaqComponent,
    FonctionnalitesComponent,
    //Utilitaire
    AutocompletecityComponent,
    AutocompleteAdresseComponent,
    //Modal
    AjoutSalleComponent,
    AjoutVilleComponent,
    ConfirmerActionComponent,
    InputCityComponent,
    AjoutEquipeComponent
  ],
  imports: [
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
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
    PortalModule,
    ScrollingModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    AppRoutingModule,
    MaterialFileInputModule
  ],
  providers: [
    //{ provide: MatDialogRef, useValue: {} },
    //{ provide: MAT_DIALOG_DATA, useValue: [] },
    //{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    //{provide: ErrorHandler, useClass: AuthErrorHandler},
    //AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
