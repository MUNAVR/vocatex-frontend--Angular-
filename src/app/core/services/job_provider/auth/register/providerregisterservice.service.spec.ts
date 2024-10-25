import { TestBed } from '@angular/core/testing';

import { ProviderRegisterService } from './providerregisterservice.service';

describe('ProviderregisterserviceService', () => {
  let service: ProviderRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
