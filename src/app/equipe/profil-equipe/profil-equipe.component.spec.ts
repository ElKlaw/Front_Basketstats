import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilEquipeComponent } from './profil-equipe.component';

describe('ProfilEquipeComponent', () => {
  let component: ProfilEquipeComponent;
  let fixture: ComponentFixture<ProfilEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
