import { Router } from '@angular/router';
import { BaseComponent } from './../../base-component';
import { RepService } from './../../../services/rep.service';
import { REP } from './../../../models/REP';
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rep-form',
  templateUrl: './rep-form.component.html',
  styleUrls: ['./rep-form.component.css']
})
export class RepFormComponent extends BaseComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('RepItem') rep: REP = <REP>{};

  constructor(private reService: RepService,
              private router: Router,
              snackBar: MatSnackBar,
              dialog: MatDialog) {
    super(snackBar, dialog);
  }

  ngOnInit() {
  }

  async submitForm(item: REP) {
    this.showLoading('Loading');
    const rep$ = await this.reService.post(item);
    await rep$.toPromise().then(() => {
      this.closeLoading();
      this.showSnackBar('Representative added successfully', 'Success');
      this.router.navigate(['/']);
    }).catch(error => {
      this.closeLoading();
      this.showSnackBar(error.message , 'error', true);
    });
  }

}
