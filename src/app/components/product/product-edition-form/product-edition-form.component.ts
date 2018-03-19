import { AppError } from './../../../models/app-error/App-error';
import { BaseComponent } from './../../base-component';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { ProductEdition } from './../../../models/ProductEdition';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-edition-form',
  templateUrl: './product-edition-form.component.html',
  styleUrls: ['./product-edition-form.component.css']
})
export class ProductEditionFormComponent extends BaseComponent implements OnInit {

  EditionProduct: ProductEdition = <ProductEdition>{};
  FakeEditionProduct: ProductEdition = <ProductEdition>{};
  constructor(
    private productService: ProductService,
    public dialogref: MatDialogRef<ProductEditionFormComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogdata: any,
    snackBar: MatSnackBar,
    dialog: MatDialog) {
    super(snackBar, dialog);
    if (this.dialogdata.edition) {
      this.FakeEditionProduct = this.dialogdata.edition;
      this.EditionProduct = Object.assign({}, this.FakeEditionProduct);
    }

  }
  ngOnInit() {
  }

  async submitForm(EditionProduct: ProductEdition) {
    if (this.dialogdata.status === 'new') {
      const Edition$ = await this.productService.addEdition(this.dialogdata.product.id, EditionProduct);
      this.showLoading('Loading');
      Edition$.toPromise().then(() => {
        this.closeLoading();
        this.dialogref.close('done');
        this.showSnackBar('Product Edition added successfully', 'Success');
      }).catch(error => {
        if (error instanceof AppError) {

        }
        this.closeLoading();
        this.dialogref.close('error');
        this.showSnackBar(error.message, 'error', true);
      });
    } else {
      this.showLoading('Loading');
      const product$ = await this.productService.updateEdition(this.dialogdata.edition.productId, EditionProduct.id, EditionProduct);
      await product$.toPromise().then((productEdition: ProductEdition) => {
        this.closeLoading();
        this.dialogref.close('done');
        this.showSnackBar('Product Edition edited successfully', 'Success');
        // this.prod = Object.assign(this.prod, productEdition);
      }).catch(error => {
        this.closeLoading();
        this.dialogref.close('error');
        this.showSnackBar(error.message, 'error', true);
      });
    }
  }

  closeDialog() {
    this.dialogref.close('error');
  }

}
