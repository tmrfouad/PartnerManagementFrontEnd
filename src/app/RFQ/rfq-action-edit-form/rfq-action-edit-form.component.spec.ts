import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqActionEditFormComponent } from './rfq-action-edit-form.component';

describe('RfqActionEditFormComponent', () => {
  let component: RfqActionEditFormComponent;
  let fixture: ComponentFixture<RfqActionEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqActionEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqActionEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
