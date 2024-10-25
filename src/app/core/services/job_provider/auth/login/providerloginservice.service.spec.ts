import { TestBed } from '@angular/core/testing';

import { ProvderLoginService } from './providerloginservice.service';

describe('ProviderloginserviceService', () => {
  let service: ProvderLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvderLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
