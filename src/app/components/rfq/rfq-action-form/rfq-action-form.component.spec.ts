import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqActionFormComponent } from './rfq-action-form.component';

describe('RfqActionFormComponent', () => {
  let component: RfqActionFormComponent;
  let fixture: ComponentFixture<RfqActionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqActionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
