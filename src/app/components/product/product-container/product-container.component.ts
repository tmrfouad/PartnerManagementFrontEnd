import { Component, OnInit } from '@angular/core';

import { Product } from '../../../models/Product';
import { ProductSharedService } from '../../../services/product-shared.service';
import { ProductService } from './../../../services/product.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit {

  product: Product = <Product>{};


  constructor(productService: ProductService, productShare: ProductSharedService) {
    productShare.currentProduct.subscribe((item: Product) => {
      if (item) { this.product = item; }
    });
  }

  ngOnInit() {
  }

}
