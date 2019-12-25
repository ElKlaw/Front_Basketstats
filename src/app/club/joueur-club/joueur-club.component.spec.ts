import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurClubComponent } from './joueur-club.component';

describe('JoueurClubComponent', () => {
  let component: JoueurClubComponent;
  let fixture: ComponentFixture<JoueurClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoueurClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueurClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
