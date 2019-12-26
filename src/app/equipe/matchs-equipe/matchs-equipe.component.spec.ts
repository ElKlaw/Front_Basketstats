import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchsEquipeComponent } from './matchs-equipe.component';

describe('MatchsEquipeComponent', () => {
  let component: MatchsEquipeComponent;
  let fixture: ComponentFixture<MatchsEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchsEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchsEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
