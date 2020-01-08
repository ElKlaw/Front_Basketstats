import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginatorIntl} from '@angular/material';
import { FrenchMatPaginatorIntl } from 'src/app/component/language/frenchmatpaginatorintl';

import {ClubService} from 'src/app/shared/service/club.service';

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
      this.loading = false;
    });
  }

  onChangePage(event){
    this.paginatorTop.pageIndex = event.pageIndex;
    this.paginatorTop.pageSize = event.pageSize;

    this.paginatorBottom.pageIndex = event.pageIndex;
    this.paginatorBottom.pageSize = event.pageSize;

    this.pageSize = event.pageSize;

    this.loadClubs(this.searchClub.nativeElement.value, event.pageIndex, event.pageSize);
  }
}
