import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';

// Basic check that makes sure the CustomerService service was created correctly.
describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
