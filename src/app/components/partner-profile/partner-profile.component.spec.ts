import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerProfileComponent } from './partner-profile.component';

describe('PartnerProfileComponent', () => {
  let component: PartnerProfileComponent;
  let fixture: ComponentFixture<PartnerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
