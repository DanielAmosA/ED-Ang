import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionLoadDataComponent } from './action-load-data.component';

// Basic check that makes sure the ActionLoadDataComponent component was created correctly.
describe('ActionLoadDataComponent', () => {
  let component: ActionLoadDataComponent;
  let fixture: ComponentFixture<ActionLoadDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionLoadDataComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActionLoadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
