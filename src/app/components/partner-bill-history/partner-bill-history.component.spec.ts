import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerBillHistoryComponent } from './partner-bill-history.component';

describe('PartnerBillHistoryComponent', () => {
  let component: PartnerBillHistoryComponent;
  let fixture: ComponentFixture<PartnerBillHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerBillHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerBillHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
