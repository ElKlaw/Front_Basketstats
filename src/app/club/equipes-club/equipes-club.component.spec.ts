import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipesClubComponent } from './equipes-club.component';

describe('EquipesClubComponent', () => {
  let component: EquipesClubComponent;
  let fixture: ComponentFixture<EquipesClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipesClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipesClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
