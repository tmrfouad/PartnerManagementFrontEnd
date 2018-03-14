import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepListComponent } from './rep-list.component';

describe('RepListComponent', () => {
  let component: RepListComponent;
  let fixture: ComponentFixture<RepListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
