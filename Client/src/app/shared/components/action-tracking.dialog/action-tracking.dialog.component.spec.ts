import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionTrackingDialogComponent } from './action-tracking.dialog.component';

// Basic check that makes sure the ActionTrackingDialogComponent component was created correctly.
describe('ActionTrackingDialogComponent', () => {
  let component: ActionTrackingDialogComponent;
  let fixture: ComponentFixture<ActionTrackingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionTrackingDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActionTrackingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
