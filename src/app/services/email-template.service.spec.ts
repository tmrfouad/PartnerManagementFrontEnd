import { TestBed, inject } from '@angular/core/testing';

import { EmailTemplateService } from './email-template.service';

describe('MailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailTemplateService]
    });
  });

  it('should be created', inject([EmailTemplateService], (service: EmailTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
