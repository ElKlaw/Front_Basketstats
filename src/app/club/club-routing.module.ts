import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Component
import { ClubComponent } from './club.component';
import { AccueilClubComponent } from './accueil-club/accueil-club.component';
import { CalendrierClubComponent } from './calendrier-club/calendrier-club.component';
import { EquipesClubComponent } from './equipes-club/equipes-club.component';
import { JoueurClubComponent } from './joueur-club/joueur-club.component';
import { MatchClubComponent } from './match-club/match-club.component';
import { ParametreClubComponent } from './parametre-club/parametre-club.component';
import { ProfilEquipeComponent } from '../equipe/profil-equipe/profil-equipe.component';

//Resolver
import { ClubResolverService } from '../shared/resolver/club-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ClubComponent,
    resolve: {
      club: ClubResolverService
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'accueil'
      },
      {
        path: 'accueil',
        component: AccueilClubComponent
      },
      {
        path: 'equipes',
        component: EquipesClubComponent
      },
      {
        path: 'equipe/:id',
        component: ProfilEquipeComponent
      },
      {
        path: 'joueurs',
        component: JoueurClubComponent
      },
      {
        path: 'calendrier',
        component: CalendrierClubComponent
      },
      {
        path: 'matchs',
        component: MatchClubComponent
      },
      {
        path: 'parametres',
        component: ParametreClubComponent
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClubRoutingModule { }
