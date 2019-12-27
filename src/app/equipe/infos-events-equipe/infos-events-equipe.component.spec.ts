import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosEventsEquipeComponent } from './infos-events-equipe.component';

describe('InfosEventsEquipeComponent', () => {
  let component: InfosEventsEquipeComponent;
  let fixture: ComponentFixture<InfosEventsEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosEventsEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosEventsEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
