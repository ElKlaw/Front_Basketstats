import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActusClubComponent } from './actus-club.component';

describe('ActusClubComponent', () => {
  let component: ActusClubComponent;
  let fixture: ComponentFixture<ActusClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActusClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActusClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
