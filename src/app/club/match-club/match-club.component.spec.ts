import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchClubComponent } from './match-club.component';

describe('MatchClubComponent', () => {
  let component: MatchClubComponent;
  let fixture: ComponentFixture<MatchClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
