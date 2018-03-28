import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EmailTemplate } from '../models/EmailTemplate';

@Injectable()
export class EmailTemplateSharedService {
  private currentTempSource = new BehaviorSubject<EmailTemplate>(null);
  private currentTempsSource = new BehaviorSubject<EmailTemplate[]>([]);

  currentTemp = this.currentTempSource.asObservable();
  currentTemps = this.currentTempsSource.asObservable();

  constructor() { }

  changeCurrentTemp(temp: EmailTemplate) {
    this.currentTempSource.next(temp);
  }

  changeCurrentTemps(temps: EmailTemplate[]) {
    this.currentTempsSource.next(temps);
  }
}
