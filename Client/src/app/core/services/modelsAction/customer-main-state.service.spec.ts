import { TestBed } from '@angular/core/testing';

import { CustomerMainStateService } from './customer-main-state.service';

// Basic check that makes sure the CustomerMainStateService service was created correctly.
describe('CustomerMainStateService', () => {
  let service: CustomerMainStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerMainStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
