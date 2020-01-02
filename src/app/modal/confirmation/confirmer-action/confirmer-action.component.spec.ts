import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmerActionComponent } from './confirmer-action.component';

describe('ConfirmerActionComponent', () => {
  let component: ConfirmerActionComponent;
  let fixture: ComponentFixture<ConfirmerActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmerActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
