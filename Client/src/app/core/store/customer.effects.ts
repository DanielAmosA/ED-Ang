import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { CustomerService } from '../../core/services/modelsAction/customer.service';
import { CustomerTypesService } from '../../core/services/modelsAction/customer-types.service';
import { AddressTypesService } from '../../core/services/modelsAction/address-types.service';
import { Router } from '@angular/router';
import { CustomerActions } from './customer.actions';

@Injectable()
// Deal with creating effects.
// Each effect has error handling that
// returns a failure action in case of error,
// in addition to a success action in case of success.
export class CustomerEffects {
  actions$ = inject(Actions);
  customerService = inject(CustomerService);
  customerTypesService = inject(CustomerTypesService);
  addressTypesService = inject(AddressTypesService);
  router = inject(Router);

  // Loads customers from the API.
  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      mergeMap(({ page, pageSize }) =>
        this.customerService.getAll(page + 1, pageSize, 'GetCustomers')
          .pipe(
            map(response => CustomerActions.loadCustomersSuccess({ response })),
            catchError(error => of(CustomerActions.loadCustomersFailure(
              {
                error: error.message || 'Failed to load customers 📛'
              }
            )))
          )
      )
    )
  );

  // Loads a single customer.
  loadCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomer),
      mergeMap(({ id }) =>
        this.customerService.getById(id, 'GetCustomer')
          .pipe(
            map(customer => CustomerActions.loadCustomerSuccess({ customer })),
            catchError(error => of(CustomerActions.loadCustomerFailure(
              {
                error: error.message || 'Failed to load customer 📛'
              }
            )))
          )
      )
    )
  );

  // Creates a new customer and navigates to the customer list page upon success.
  createCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.createCustomer),
      mergeMap(({ customer }) =>
        this.customerService.create(customer, 'CreateNewCustomer')
          .pipe(
            map(newCustomer => CustomerActions.createCustomerSuccess({ customer: newCustomer })),
            tap(() => this.router.navigate(['/customers'])),
            catchError(error => of(CustomerActions.createCustomerFailure(
              {
                error: error.message || 'Failed to create customer 📛'
              }
            )))
          )
      )
    )
  );

  // Updates an existing customer and navigates to the customer list page upon success
  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.updateCustomer),
      mergeMap(({ customer, id }) =>
        this.customerService.update(customer, id, 'updateCustomer')
          .pipe(
            map(updatedCustomer => CustomerActions.updateCustomerSuccess({ customer: updatedCustomer })),
            tap(() => this.router.navigate(['/customers'])),
            catchError(error => of(CustomerActions.updateCustomerFailure(
              {
                error: error.message || 'Failed to update customer 📛'
              }
            )))
          )
      )
    )
  );

  // Deletes a customer.
  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      mergeMap(({ id }) =>
        this.customerService.delete(id, 'DeleteCustomer')
          .pipe(
            map(() => CustomerActions.deleteCustomerSuccess({ id })),
            catchError(error => of(CustomerActions.deleteCustomerFailure(
              {
                error: error.message || 'Failed to delete customer 📛'
              }
            )))
          )
      )
    )
  );

  // Loads the customer types.
  loadCustomerTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomerTypes),
      mergeMap(() =>
        this.customerTypesService.getAll('GetAllCustomerTypes')
          .pipe(
            map(types => CustomerActions.loadCustomerTypesSuccess({ types })),
            catchError(error => of(CustomerActions.loadCustomerTypesFailure(
              {
                error: error.message || 'Failed to load customer types 📛'
              }
            )))
          )
      )
    )
  );

  // Loads the address types.
  loadAddressTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadAddressTypes),
      mergeMap(() =>
        this.addressTypesService.getAll('GetAllAddressTypes')
          .pipe(
            map(types => CustomerActions.loadAddressTypesSuccess({ types })),
            catchError(error => of(CustomerActions.loadAddressTypesFailure(
              {
                error: error.message || 'Failed to load address types 📛'
              }
            )))
          )
      )
    )
  );
}
