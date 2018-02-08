import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerCartComponent } from './cutomer-cart.component';

describe('CutomerCartComponent', () => {
  let component: CutomerCartComponent;
  let fixture: ComponentFixture<CutomerCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutomerCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutomerCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
