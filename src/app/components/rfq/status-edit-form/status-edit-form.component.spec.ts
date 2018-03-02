import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEditFormComponent } from './status-edit-form.component';

describe('StatusEditFormComponent', () => {
  let component: StatusEditFormComponent;
  let fixture: ComponentFixture<StatusEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
