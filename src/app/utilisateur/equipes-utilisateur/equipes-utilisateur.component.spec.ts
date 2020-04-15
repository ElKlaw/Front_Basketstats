import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipesUtilisateurComponent } from './equipes-utilisateur.component';

describe('EquipesUtilisateurComponent', () => {
  let component: EquipesUtilisateurComponent;
  let fixture: ComponentFixture<EquipesUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipesUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipesUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
