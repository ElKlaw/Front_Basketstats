import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreClubComponent } from './parametre-club.component';

describe('ParametreClubComponent', () => {
  let component: ParametreClubComponent;
  let fixture: ComponentFixture<ParametreClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametreClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
