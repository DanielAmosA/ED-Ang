import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { customerFeature } from './customer.reducer';
import { CustomerEffects } from './customer.effects';
import { customerFormFeature } from './customer-form.reducer';
import { CustomerFormEffects } from './customer-form.effects';

// defining providers for the store and effects in NgRx.
export const customerStoreProviders = [
  provideState(customerFeature),
  provideEffects(CustomerEffects)
];

export const customerFormStoreProviders = [
  provideState(customerFormFeature),
  provideEffects(CustomerFormEffects)
];
