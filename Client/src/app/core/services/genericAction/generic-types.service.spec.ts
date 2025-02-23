import { TestBed } from '@angular/core/testing';
import { GenericTypesService } from './generic-types.service';
import { CustomerTypes } from '../../models/customerTypes.model';

// Basic check that makes sure the GenericTypesService service was created correctly.
describe('GenericTypesService', () => {
  let service: GenericTypesService<CustomerTypes>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
