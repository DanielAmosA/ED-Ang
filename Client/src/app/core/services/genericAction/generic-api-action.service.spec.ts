import { TestBed } from '@angular/core/testing';
import { GenericApiActionService } from './generic-api-action.service';
import { Customer } from '../../models/customer.model';

// Basic check that makes sure the GenericApiActionService service was created correctly.
describe('GenericApiActionService', () => {
  let service: GenericApiActionService<Customer>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericApiActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
