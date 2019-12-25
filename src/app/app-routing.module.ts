import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Club
import { SearchClubComponent } from './club/search-club/search-club.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'clubs' },
    { path: 'clubs', component: SearchClubComponent },
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
