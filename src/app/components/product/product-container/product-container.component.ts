import { Product } from '../../../models/Product';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductEditionFormComponent } from './../product-edition-form/product-edition-form.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from './../../../services/product.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit {

  product: Product = <Product>{};
  reload: string;
  status = 'new';

  constructor(productService: ProductService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  selectProduct(product) {
    this.product = product;
    this.reload = '';

    if (this.product) {
      if (Object.keys(this.product).length > 0) {
        this.status = 'edit';
      } else {
        this.status = 'new';
      }
    }
  }

  reloadList(item: string) {
    this.reload = item.trim();
  }

}
