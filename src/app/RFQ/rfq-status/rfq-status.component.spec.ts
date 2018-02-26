import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqStatusComponent } from './rfq-status.component';

describe('RfqStatusComponent', () => {
  let component: RfqStatusComponent;
  let fixture: ComponentFixture<RfqStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
