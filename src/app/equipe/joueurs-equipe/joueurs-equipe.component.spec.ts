import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueursEquipeComponent } from './joueurs-equipe.component';

describe('JoueursEquipeComponent', () => {
  let component: JoueursEquipeComponent;
  let fixture: ComponentFixture<JoueursEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoueursEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueursEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
