import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosClubComponent } from './infos-club.component';

describe('InfosClubComponent', () => {
  let component: InfosClubComponent;
  let fixture: ComponentFixture<InfosClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
