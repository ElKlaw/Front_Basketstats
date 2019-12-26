import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipeComponent } from './equipe.component';
import { ProfilEquipeComponent } from './profil-equipe/profil-equipe.component';
import { CalendrierEquipeComponent} from './calendrier-equipe/calendrier-equipe.component';
import { JoueursEquipeComponent} from './joueurs-equipe/joueurs-equipe.component';
import { MatchsEquipeComponent} from './matchs-equipe/matchs-equipe.component';

const routes: Routes = [
  {
    path: '',
    component: EquipeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profil'
      },
      {
        path: 'profil',
        component: ProfilEquipeComponent
      },
      {
        path: 'calendrier',
        component: CalendrierEquipeComponent
      },
      {
        path: 'joueurs',
        component: JoueursEquipeComponent
      },
      {
        path: 'matchs',
        component: MatchsEquipeComponent
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
export class EquipeRoutingModule { }
