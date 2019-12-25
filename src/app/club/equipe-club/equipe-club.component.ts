import { Component, OnInit } from '@angular/core';

import { EquipeService } from 'src/app/shared/service/equipe.service';
import { Equipe } from 'src/app/shared/equipe';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-equipe-club',
  templateUrl: './equipe-club.component.html',
  styleUrls: ['./equipe-club.component.css']
})
export class EquipeClubComponent implements OnInit {
  equipe: Equipe;

  constructor(
    private route: ActivatedRoute,
    public equipeService: EquipeService
  ) {
  }

  ngOnInit(){
    this.getEquipe();
  }

  getEquipe() {
    this.equipeService.equipe$.subscribe((equipe: Equipe) => {
      this.equipe = equipe;
    });
    this.equipeService.getEquipe(this.route.snapshot.paramMap.get('id'));
  }

}
