import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierEquipeComponent } from './calendrier-equipe.component';

describe('CalendrierEquipeComponent', () => {
  let component: CalendrierEquipeComponent;
  let fixture: ComponentFixture<CalendrierEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
