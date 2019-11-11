import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ClubService} from '../../shared/club.service';
import {UserService} from '../../shared/user.service';
import {Club} from '../../shared/club';

declare var $: any;

@Component({
  selector: 'app-vue-interne-club',
  templateUrl: './vue-interne-club.component.html',
  styleUrls: ['./vue-interne-club.component.css']
})
export class VueInterneClubComponent implements OnInit {

    club: Club;
    affichageMenu: string;
    
    
    constructor(
        private route: ActivatedRoute,
        public clubService: ClubService,
        public userService: UserService
    ) { }

    ngOnInit() {
       this.getClub();
       this.affichageMenu = 'Accueil';
       $(function() {
            $('.nav li').click(function() {
                $('.nav li').removeClass('active'); 
                $(this).addClass('active');
            });
       });
    }

    getClub() {
        const url = this.route.snapshot.params.url;
        this.clubService.getClubByURL(url).subscribe(club => this.club = club);
    }

    getAffichageAccueil() {
        this.affichageMenu = 'Accueil';  
    }
    
    getAffichageActus() {
        this.affichageMenu = 'Actus';  
    }

    getAffichageCalendrier() {
        this.affichageMenu = 'Calendrier';
    }

    getAffichageJoueurs() {
        this.affichageMenu = 'Joueurs';
    }

    getAffichageMatchs() {
        this.affichageMenu = 'Matchs';
    }

    getAffichageEquipes() {
        this.affichageMenu = 'Equipes';
    }
    
    getAffichageParametre() {
        this.affichageMenu = 'Parametre';
    }
    
    updateClub(event){
        this.club = event;
    }
    
}
