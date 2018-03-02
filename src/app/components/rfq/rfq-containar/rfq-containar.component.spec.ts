import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqContainarComponent } from './rfq-containar.component';

describe('RfqContainarComponent', () => {
  let component: RfqContainarComponent;
  let fixture: ComponentFixture<RfqContainarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqContainarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqContainarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
