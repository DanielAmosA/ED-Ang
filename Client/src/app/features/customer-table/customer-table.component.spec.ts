import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerTableComponent } from './customer-table.component';

// Basic check that makes sure the CustomerTableComponent component was created correctly.
describe('CustomerTableComponent', () => {
  let component: CustomerTableComponent;
  let fixture: ComponentFixture<CustomerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
