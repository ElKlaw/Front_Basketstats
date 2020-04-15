import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierUtilisateurComponent } from './calendrier-utilisateur.component';

describe('CalendrierUtilisateurComponent', () => {
  let component: CalendrierUtilisateurComponent;
  let fixture: ComponentFixture<CalendrierUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
