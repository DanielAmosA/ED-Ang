import { TestBed } from '@angular/core/testing';
import { CustomerTypesService } from './customer-types.service';

// Basic check that makes sure the CustomerTypesService service was created correctly.
describe('CustomerTypesService', () => {
  let service: CustomerTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
