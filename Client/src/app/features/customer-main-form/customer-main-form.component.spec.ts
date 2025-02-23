import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerMainFormComponent } from './customer-main-form.component';

// Basic check that makes sure the CustomerMainFormComponent component was created correctly.
describe('CustomerMainFormComponent', () => {
  let component: CustomerMainFormComponent;
  let fixture: ComponentFixture<CustomerMainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMainFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
