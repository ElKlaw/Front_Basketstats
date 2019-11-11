import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteLieuComponent } from './autocomplete-lieu.component';

describe('AutocompleteLieuComponent', () => {
  let component: AutocompleteLieuComponent;
  let fixture: ComponentFixture<AutocompleteLieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteLieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
