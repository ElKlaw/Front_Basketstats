import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosMatchsEquipeComponent } from './infos-matchs-equipe.component';

describe('InfosMatchsEquipeComponent', () => {
  let component: InfosMatchsEquipeComponent;
  let fixture: ComponentFixture<InfosMatchsEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosMatchsEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosMatchsEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
