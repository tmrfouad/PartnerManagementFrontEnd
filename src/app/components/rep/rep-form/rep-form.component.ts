import { Router } from '@angular/router';
import { BaseComponent } from './../../base-component';
import { RepService } from './../../../services/rep.service';
import { REP } from './../../../models/REP';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rep-form',
  templateUrl: './rep-form.component.html',
  styleUrls: ['./rep-form.component.css']
})
export class RepFormComponent extends BaseComponent implements OnInit {

  constructor(private reService: RepService,
              private router: Router,
              snackBar: MatSnackBar,
              dialog: MatDialog) {
    super(snackBar, dialog);
  }

  ngOnInit() {
  }

  async submitForm(rep: REP) {
    console.log(rep);
    this.showLoading('Loading');
    const rep$ = await this.reService.addRep(rep);
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
