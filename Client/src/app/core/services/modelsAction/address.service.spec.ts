import { TestBed } from '@angular/core/testing';
import { AddressService } from './address.service';

// Basic check that makes sure the AddressService service was created correctly.
describe('AddressService', () => {
  let service: AddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
