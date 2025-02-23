import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Customer } from '../../core/models/customer.model';
import { LoadingState } from '../../core/interfaces/loadingState.interface';
import { CustomerFormState } from '../../core/interfaces/customerFormState.interface';
import { CustomerTypes } from '../models/customerTypes.model';
import { AddressTypes } from '../models/addressTypes.model';

// Creation of actions for a store management system,
// which involves working with form, loading, submit.
export const CustomerFormActions = createActionGroup({
  source: 'Customer Form',
  events: {
    // Form State Management
    'Update Loading State': props<{ state: LoadingState }>(),
    'Update Form State': props<{ state: CustomerFormState }>(),
    'Reset Form': emptyProps(),

    // Initialize Form
    'Init Form Data': props<{ id: string | null }>(),
    'Init Form Data Success': props<{ customer: Customer | null }>(),
    'Init Form Data Failure': props<{ error: string }>(),

    // Submit Form
    'Submit Form': props<{ customer: Customer; isEdit: boolean }>(),
    'Submit Form Success': props<{ customer: Customer; isEdit: boolean }>(),
    'Submit Form Failure': props<{ error: string }>(),

    // Reset Form Data
    'Reset Form Data': emptyProps(),
    'Clear Form Errors': emptyProps(),

    // Customer Types
    'Load Customer Types': emptyProps(),
    'Load Customer Types Success': props<{ types: CustomerTypes[] }>(),
    'Load Customer Types Failure': props<{ error: string }>(),

    // Address Types
    'Load Address Types': emptyProps(),
    'Load Address Types Success': props<{ types: AddressTypes[] }>(),
    'Load Address Types Failure': props<{ error: string }>(),

    // Load All Types Together
    'Load All Types': emptyProps(),
    'Load All Types Success': props<{
      customerTypes: CustomerTypes[];
      addressTypes: AddressTypes[]
    }>(),
    'Load All Types Failure': props<{ error: string }>(),

  }
});
