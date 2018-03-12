import { RepService } from './../../../services/rep.service';
import { REP } from './../../../models/REP';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rep-form',
  templateUrl: './rep-form.component.html',
  styleUrls: ['./rep-form.component.css']
})
export class RepFormComponent implements OnInit {

  constructor(private reService: RepService) { }

  ngOnInit() {
  }

  async submitForm(rep: REP) {
    console.log(rep);
    const rep$ = await this.reService.addRep(rep);
    await rep$.toPromise();
  }

}
