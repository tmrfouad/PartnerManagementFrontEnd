import { Http, HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { MainService } from './main-service.service';

describe('MainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpModule]  , 
      providers: [MainService]
    });
  });

  it('should be created', inject([MainService], (service: MainService) => {
    expect(service).toBeTruthy();
  }));
});
