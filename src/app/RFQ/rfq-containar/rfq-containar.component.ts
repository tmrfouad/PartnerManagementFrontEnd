import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'rfq-containar',
  templateUrl: './rfq-containar.component.html',
  styleUrls: ['./rfq-containar.component.css']
})
export class RfqContainarComponent implements OnInit {

  orederId;

  constructor(private activatedRoute: ActivatedRoute) { 

    activatedRoute.queryParamMap.subscribe(param => {
        this.orederId = param.get("orederId");
     });

  }

  orederIdparam : string;

  ngOnInit() {

  }

  onclick() { 
  }

}
