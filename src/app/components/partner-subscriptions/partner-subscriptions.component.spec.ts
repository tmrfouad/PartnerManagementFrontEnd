import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSubscriptionsComponent } from './partner-subscriptions.component';

describe('PartnerSubscriptionsComponent', () => {
  let component: PartnerSubscriptionsComponent;
  let fixture: ComponentFixture<PartnerSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
