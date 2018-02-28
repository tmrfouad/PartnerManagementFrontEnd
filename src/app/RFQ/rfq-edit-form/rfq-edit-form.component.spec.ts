import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqEditFormComponent } from './rfq-edit-form.component';

describe('RfqEditFormComponent', () => {
  let component: RfqEditFormComponent;
  let fixture: ComponentFixture<RfqEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
