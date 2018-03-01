import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLisEditComponent } from './status-lis-edit.component';

describe('StatusLisEditComponent', () => {
  let component: StatusLisEditComponent;
  let fixture: ComponentFixture<StatusLisEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusLisEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusLisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
