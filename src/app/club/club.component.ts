import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {ClubService} from 'src/app/shared/service/club.service';
import { PhotoService } from 'src/app/shared/service/photo.service';

import {Club} from 'src/app/shared/club';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent {
  club: Club;
  imagefond: any;
  imagelogo: any;
  constructor(
    public clubService: ClubService,
    public photoService: PhotoService,
    private route: ActivatedRoute
  ) {
    this.getClub();
  }

  getClub() {
    this.route.data.subscribe(
      (data: any) =>{
        this.club = data.club;
        this.loadImage();
      }
    );
  }

  loadImage(){
    this.getImageFond(this.club.fond.id);
    this.getImageLogo(this.club.logo.id);
  }

  getImageFond(id) {
    this.photoService.getPhotoById(id).subscribe(
      image => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          this.imagefond = reader.result;
        }, false);

        if (image) {
          reader.readAsDataURL(image);
        }
      }
    );
  }

  getImageLogo(id) {
    this.photoService.getPhotoById(id).subscribe(
      image => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          this.imagelogo = reader.result;
        }, false);

        if (image) {
          reader.readAsDataURL(image);
        }
      }
    );
  }
}
