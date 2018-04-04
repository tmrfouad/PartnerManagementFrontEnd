import { Component, OnInit } from '@angular/core';
import { RfqService } from '../../services/rfq.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {

  constructor(public rfqService: RfqService) { }

  ngOnInit() {
  }

}
