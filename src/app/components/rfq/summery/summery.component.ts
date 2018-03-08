import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.css']
})
export class SummeryComponent implements OnInit {

  constructor() { }
  actionType = {
    attende : [],
    where : '',
    visitReason : '',
    comment : '',

  };

  ngOnInit() {
  }

  addItem(item) {
    this.actionType.attende.push(item);

  }

  removeItem(item) {
    const index = this.actionType.attende.indexOf(item);
    this.actionType.attende.splice(index, 1);
  }


  submit(formItem) {
    console.log(this.actionType);
  }

}
