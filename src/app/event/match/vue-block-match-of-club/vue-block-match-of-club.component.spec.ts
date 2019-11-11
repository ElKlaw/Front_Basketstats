import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueBlockMatchOfClubComponent } from './vue-block-match-of-club.component';

describe('VueBlockMatchOfClubComponent', () => {
  let component: VueBlockMatchOfClubComponent;
  let fixture: ComponentFixture<VueBlockMatchOfClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueBlockMatchOfClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueBlockMatchOfClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
