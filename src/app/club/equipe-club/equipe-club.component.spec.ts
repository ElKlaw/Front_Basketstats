import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeClubComponent } from './equipe-club.component';

describe('EquipeClubComponent', () => {
  let component: EquipeClubComponent;
  let fixture: ComponentFixture<EquipeClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
