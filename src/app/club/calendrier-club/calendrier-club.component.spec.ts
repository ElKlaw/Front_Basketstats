import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierClubComponent } from './calendrier-club.component';

describe('CalendrierClubComponent', () => {
  let component: CalendrierClubComponent;
  let fixture: ComponentFixture<CalendrierClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
