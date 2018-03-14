import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepContainerComponent } from './rep-container.component';

describe('RepContainerComponent', () => {
  let component: RepContainerComponent;
  let fixture: ComponentFixture<RepContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
