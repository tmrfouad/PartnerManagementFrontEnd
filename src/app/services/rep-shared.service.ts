import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { REP } from '../models/REP';

@Injectable()
export class RepSharedService {

  private repsharedService = new BehaviorSubject<REP>(null);
  currentrep = this.repsharedService.asObservable();

  private repListService = new BehaviorSubject<REP[]>(null);
  currentRepListService = this.repListService.asObservable();


  constructor() { }

  changeRep(rep) {
    this.repsharedService.next(rep);
  }

  changeRepList(repList: REP[]) {
    this.repListService.next(repList);
  }
}
