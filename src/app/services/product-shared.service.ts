import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { ProductEdition } from '../models/ProductEdition';

@Injectable()
export class ProductSharedService {

  private productCurrent = new BehaviorSubject<Product>(null);
  currentProduct = this.productCurrent.asObservable();

  private productListShared = new BehaviorSubject<Product[]>(null);
  currentProductList = this.productListShared.asObservable();

  private prodEditionCurrent = new BehaviorSubject<ProductEdition>(null);
  currentEdition = this.prodEditionCurrent.asObservable();

  private prodEditionList = new BehaviorSubject<ProductEdition[]>(null);
  currentEditionList = this.prodEditionList.asObservable();


  constructor() { }

  changeProduct(product: Product) {
    this.productCurrent.next(product);
  }

  changeProductList(productList: Product[]) {
    this.productListShared.next(productList);
  }


  changeEdition(product: ProductEdition) {
    this.prodEditionCurrent.next(product);
  }

  changeEditionList(productList: ProductEdition[]) {
    this.prodEditionList.next(productList);
  }
}
