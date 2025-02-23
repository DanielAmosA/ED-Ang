import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenTableComponent } from './gen-table.component';
import { Customer } from '../../../core/models/customer.model';

// Basic check that makes sure the HeaderComponent component was created correctly.

describe('GenTableComponent', () => {
  let fixture: ComponentFixture<GenTableComponent<Customer>>;
  let component: GenTableComponent<Customer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenTableComponent]
    });
    fixture = TestBed.createComponent<GenTableComponent<Customer>>(GenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
