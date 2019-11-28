import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueAccueilClubComponent } from './vue-accueil-club.component';

describe('VueAccueilClubComponent', () => {
  let component: VueAccueilClubComponent;
  let fixture: ComponentFixture<VueAccueilClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueAccueilClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueAccueilClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
