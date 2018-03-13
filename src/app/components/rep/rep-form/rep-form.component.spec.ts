import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepFormComponent } from './rep-form.component';

describe('RepFormComponent', () => {
  let component: RepFormComponent;
  let fixture: ComponentFixture<RepFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
