import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosJoueursEquipeComponent } from './infos-joueurs-equipe.component';

describe('InfosJoueursEquipeComponent', () => {
  let component: InfosJoueursEquipeComponent;
  let fixture: ComponentFixture<InfosJoueursEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosJoueursEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosJoueursEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
