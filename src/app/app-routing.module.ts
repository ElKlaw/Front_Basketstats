import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'accueil' },
    { path: 'accueil', component: AccueilComponent },
    { path: 'fonctionnalites', component: FonctionnalitesComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'clubs', component: SearchClubComponent },
    { path: 'creer-club', component: CreerClubComponent },
    {
      path: 'club/:url',
      loadChildren: './club/club.module#ClubModule'
    }
];

const routesModal: Routes = [
  {path: '', component: AjoutSalleComponent},
  {path: '', component: AjoutVilleComponent},
  {path: '', component: ConfirmerActionComponent},
  {path: '', component: AjoutEquipeComponent}
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
