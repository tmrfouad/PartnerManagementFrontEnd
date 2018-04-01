import { Http, HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { DataService } from './data-service.service';


describe('MainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpModule],
      providers: [DataService]
    });
  });

  it('should be created', inject([DataService], (service: DataService<any>) => {
    expect(service).toBeTruthy();
  }));
});
