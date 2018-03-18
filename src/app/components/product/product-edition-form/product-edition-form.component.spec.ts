import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditionFormComponent } from './product-edition-form.component';

describe('ProductEditionFormComponent', () => {
  let component: ProductEditionFormComponent;
  let fixture: ComponentFixture<ProductEditionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEditionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
