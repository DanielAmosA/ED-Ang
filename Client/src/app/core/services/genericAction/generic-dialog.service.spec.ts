import { TestBed } from '@angular/core/testing';
import { GenericDialogService } from './generic-dialog.service';
import { ActionTrackingDialogComponent } from '../../../shared/components/action-tracking.dialog/action-tracking.dialog.component';

// Basic check that makes sure the GenericDialogService service was created correctly.
describe('GenericDialogService', () => {
  let service: GenericDialogService<ActionTrackingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
