import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosMatchClubComponent } from './infos-match-club.component';

describe('InfosMatchClubComponent', () => {
  let component: InfosMatchClubComponent;
  let fixture: ComponentFixture<InfosMatchClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosMatchClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosMatchClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
