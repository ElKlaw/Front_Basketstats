import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Club
import { SearchClubComponent } from './club/search-club/search-club.component';
import { CreerClubComponent } from './club/creer-club/creer-club.component';
import { AccueilComponent } from './autres/accueil/accueil.component';
import { FaqComponent } from './autres/faq/faq.component';
import { FonctionnalitesComponent } from './autres/fonctionnalites/fonctionnalites.component';

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

@NgModule({
  imports: [
      RouterModule.forRoot(
        routes
      )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
