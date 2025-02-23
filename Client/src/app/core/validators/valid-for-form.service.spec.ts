import { TestBed } from '@angular/core/testing';
import { ValidForFormService } from './valid-for-form.service';

// Basic check that makes sure the ValidForFormService service was created correctly.
describe('ValidForFormService', () => {
  let service: ValidForFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidForFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
