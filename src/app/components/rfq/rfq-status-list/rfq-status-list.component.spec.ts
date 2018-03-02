import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqStatusListComponent } from './rfq-status-list.component';

describe('RfqStatusListComponent', () => {
  let component: RfqStatusListComponent;
  let fixture: ComponentFixture<RfqStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
