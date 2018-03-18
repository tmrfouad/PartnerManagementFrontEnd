import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditionListComponent } from './product-edition-list.component';

describe('ProductEditionListComponent', () => {
  let component: ProductEditionListComponent;
  let fixture: ComponentFixture<ProductEditionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEditionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
