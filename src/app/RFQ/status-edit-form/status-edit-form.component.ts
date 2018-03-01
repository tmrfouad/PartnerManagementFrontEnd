import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RFQAction } from '../../models/RFQAction';
import { RfqService } from '../../services/rfq.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'status-edit-form',
  templateUrl: './status-edit-form.component.html',
  styleUrls: ['./status-edit-form.component.css']
})
export class StatusEditFormComponent implements OnInit {
  @Input('action') action: RFQAction = <RFQAction>{};
  rfqStatus: RFQAction = <RFQAction>{};

  @Output('closed') closed = new EventEmitter();

  constructor(private rfqService: RfqService) { }

  ngOnInit() {
    this.rfqStatus = Object.assign({}, this.action);
  }

  async logForm(f: RFQAction) {
    const rfq$ = await this.rfqService.updateStatus(this.action.rfqId, this.action.id, f);
    rfq$.toPromise().then(() => {
      this.action = Object.assign(this.action, this.rfqStatus);
      this.closed.emit();
    });
  }

  closeForm() {
    this.closed.emit();
  }
}
