import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Guard
import { AuthGuard } from './shared/guard/authguard';

//Club
import { SearchClubComponent } from './club/search-club/search-club.component';
import { CreerClubComponent } from './club/creer-club/creer-club.component';
import { AccueilComponent } from './autres/accueil/accueil.component';
import { FaqComponent } from './autres/faq/faq.component';
import { FonctionnalitesComponent } from './autres/fonctionnalites/fonctionnalites.component';

//Modal
import { AjoutSalleComponent } from './modal/salle/ajout-salle/ajout-salle.component';
import { AjoutVilleComponent } from './modal/ville/ajout-ville/ajout-ville.component';
import { ConfirmerActionComponent } from './modal/confirmation/confirmer-action/confirmer-action.component';
import { AjoutEquipeComponent } from './modal/equipe/ajout-equipe/ajout-equipe.component';
import { AjoutEventComponent } from './modal/event/ajout-event/ajout-event.component';
import { ModalInscriptionComponent } from './modal/modal-inscription/modal-inscription.component';

// Utilisateur
import { LoginComponent } from './utilisateur/login/login.component';
import { InscriptionComponent } from './utilisateur/inscription/inscription.component';
import { CalendrierUtilisateurComponent } from './utilisateur/calendrier-utilisateur/calendrier-utilisateur.component';
import { ProfilUtilisateurComponent } from './utilisateur/profil-utilisateur/profil-utilisateur.component';
import { EquipesUtilisateurComponent } from './utilisateur/equipes-utilisateur/equipes-utilisateur.component';



const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'accueil' },
    { path: 'accueil', component: AccueilComponent },
    { path: 'fonctionnalites', component: FonctionnalitesComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'clubs', component: SearchClubComponent },
    { path: 'creer-club', component: CreerClubComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'club/:url',
      loadChildren: './club/club.module#ClubModule',
      canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },
    { path: 'inscription', component: InscriptionComponent },
    { path: 'profil', component: ProfilUtilisateurComponent },
    { path: 'calendrier', component: CalendrierUtilisateurComponent },
    { path: 'equipes', component: EquipesUtilisateurComponent }
];

const routesModal: Routes = [
  {path: '', component: AjoutSalleComponent},
  {path: '', component: AjoutVilleComponent},
  {path: '', component: ConfirmerActionComponent},
  {path: '', component: AjoutEquipeComponent},
  {path: '', component: AjoutEventComponent},
  {path: '', component: ModalInscriptionComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    ),
    RouterModule.forChild(
      routesModal
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
