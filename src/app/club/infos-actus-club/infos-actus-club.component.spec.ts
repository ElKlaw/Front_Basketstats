import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosActusClubComponent } from './infos-actus-club.component';

describe('InfosActusClubComponent', () => {
  let component: InfosActusClubComponent;
  let fixture: ComponentFixture<InfosActusClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosActusClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosActusClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
