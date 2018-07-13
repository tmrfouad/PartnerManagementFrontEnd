import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  pageIndex = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      switch (url[0].path) {
        case 'partner-prof':
          this.pageIndex = 0;
          break;
        case 'partner-subs':
          this.pageIndex = 1;
          break;
        case 'partner-bills':
          this.pageIndex = 2;
          break;
        default:
          break;
      }
    });
  }

}
