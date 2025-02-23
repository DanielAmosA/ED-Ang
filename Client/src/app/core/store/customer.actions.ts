import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Customer } from '../../core/models/customer.model';
import { ApiActionResponse } from '../../core/interfaces/apiActionResponse.interface';
import { CustomerTypes } from '../../core/models/customerTypes.model';
import { AddressTypes } from '../../core/models/addressTypes.model';

// Creation of actions for a store management system,
// which involves working with customers, customer types, address types, and more.
export const CustomerActions = createActionGroup({
  source: 'Customer',
  events: {

    // Load Customers
    'Load Customers': props<{ page: number; pageSize: number }>(),
    'Load Customers Success': props<{ response: ApiActionResponse<Customer> }>(),
    'Load Customers Failure': props<{ error: string }>(),

    // Load Single Customer
    'Load Customer': props<{ id: number }>(),
    'Load Customer Success': props<{ customer: Customer }>(),
    'Load Customer Failure': props<{ error: string }>(),

    // Create Customer
    'Create Customer': props<{ customer: Customer }>(),
    'Create Customer Success': props<{ customer: Customer }>(),
    'Create Customer Failure': props<{ error: string }>(),

    // Update Customer
    'Update Customer': props<{ customer: Customer; id: string }>(),
    'Update Customer Success': props<{ customer: Customer }>(),
    'Update Customer Failure': props<{ error: string }>(),

    // Delete Customer
    'Delete Customer': props<{ id: number }>(),
    'Delete Customer Success': props<{ id: number }>(),
    'Delete Customer Failure': props<{ error: string }>(),

    // Load Customer Types
    'Load Customer Types': emptyProps(),
    'Load Customer Types Success': props<{ types: CustomerTypes[] }>(),
    'Load Customer Types Failure': props<{ error: string }>(),

    // Load Address Types
    'Load Address Types': emptyProps(),
    'Load Address Types Success': props<{ types: AddressTypes[] }>(),
    'Load Address Types Failure': props<{ error: string }>(),

    // Reset State
    'Reset Customer State': emptyProps(),
    'Clear Selected Customer': emptyProps()
  }
});
