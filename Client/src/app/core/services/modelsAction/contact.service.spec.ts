import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';

// Basic check that makes sure the ContactService service was created correctly.
describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
