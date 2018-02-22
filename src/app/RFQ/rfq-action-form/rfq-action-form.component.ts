import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rfq-action-form',
  templateUrl: './rfq-action-form.component.html',
  styleUrls: ['./rfq-action-form.component.css']
})
export class RfqActionFormComponent implements OnInit {

  constructor(private activeRoute : ActivatedRoute) { }

  ngOnInit() {
    // this.activeRoute.queryParamMap.subscribe(param => {
    //     alert(param.get("orederId"));
    //  });
  }

}
