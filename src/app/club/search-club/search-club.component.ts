import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginatorIntl} from '@angular/material';
import { FrenchMatPaginatorIntl } from 'src/app/component/language/frenchmatpaginatorintl';

import {ClubService} from 'src/app/shared/service/club.service';
import { PhotoService } from 'src/app/shared/service/photo.service';

import { Page } from 'src/app/shared/page';
import { Club } from 'src/app/shared/club';


@Component({
  selector: 'app-search-club',
  templateUrl: './search-club.component.html',
  styleUrls: ['./search-club.component.css'],
  providers: [
      {provide: MatPaginatorIntl, useClass: FrenchMatPaginatorIntl}
  ]
})
export class SearchClubComponent implements OnInit {
  clubs: Club[]= [];

  length = 100;
  pageSize = 12;
  pageSizeOptions: number[] = [9, 12, 24];
  @ViewChild('paginatorTop', {static: false}) paginatorTop;
  @ViewChild('paginatorBottom', {static: false}) paginatorBottom;
  @ViewChild('searchInput', {static: false}) searchClub;

  loading=true;

  constructor(
    public photoService: PhotoService,
    public clubService: ClubService
  ) { }

  ngOnInit() {
    this.loadClubs('', 0, this.pageSize);
  }

  searchClubs(nom) {
    this.loadClubs(nom, 0, this.pageSize)
  }

  loadClubs(nom, page, size) {
    return this.clubService.searchClub(nom, page, size).subscribe((data: Page) => {
      this.clubs = data.content;
      this.length= data.totalElements;
      this.clubs.forEach(async(club: Club) =>{
        await this.loadImage(club);
      })
      this.loading = false;
    });
  }

  loadImage(club: Club){
    this.getImageFond(club);
    this.getImageLogo(club);
  }

  onChangePage(event){
    this.paginatorTop.pageIndex = event.pageIndex;
    this.paginatorTop.pageSize = event.pageSize;

    this.paginatorBottom.pageIndex = event.pageIndex;
    this.paginatorBottom.pageSize = event.pageSize;

    this.pageSize = event.pageSize;

    this.loadClubs(this.searchClub.nativeElement.value, event.pageIndex, event.pageSize);
  }

  getImageFond(club: Club) {
    this.photoService.getPhotoById(club.fond.id).subscribe(
      image => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          club.imagefont = reader.result;
        }, false);

        if (image) {
          reader.readAsDataURL(image);
        }
      }
    );
  }

  getImageLogo(club: Club) {
    this.photoService.getPhotoById(club.logo.id).subscribe(
      image => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          club.imagelogo= reader.result;
        }, false);

        if (image) {
          reader.readAsDataURL(image);
        }
      }
    );
  }
}
