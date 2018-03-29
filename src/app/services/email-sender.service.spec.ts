import { TestBed, inject } from '@angular/core/testing';

import { EmailSenderService } from './email-sender.service';

describe('EmailSenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailSenderService]
    });
  });

  it('should be created', inject([EmailSenderService], (service: EmailSenderService) => {
    expect(service).toBeTruthy();
  }));
});
