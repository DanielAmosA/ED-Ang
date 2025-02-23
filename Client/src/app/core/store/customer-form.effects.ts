import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerFormActions } from './customer-form.actions';
import { catchError, combineLatest, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { CustomerService } from '../../core/services/modelsAction/customer.service';
import { CustomerTypesService } from '../../core/services/modelsAction/customer-types.service';
import { AddressTypesService } from '../../core/services/modelsAction/address-types.service';
import { Router } from '@angular/router';
import { ActionTrackingDialogComponent } from '../../shared/components/action-tracking.dialog/action-tracking.dialog.component';
import { GenericDialogService } from '../services/genericAction/generic-dialog.service';

@Injectable()
// Deal with creating effects.
// Each effect has error handling that
// returns a failure action in case of error,
// in addition to a success action in case of success.
export class CustomerFormEffects {
  actions$ = inject(Actions);
  customerService = inject(CustomerService);
  customerTypesService = inject(CustomerTypesService);
  addressTypesService = inject(AddressTypesService);
  dialogService = inject(GenericDialogService)
  router = inject(Router);

  // Init Form Data With Success
  initFormData$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(CustomerFormActions.initFormData),
        switchMap(({ id }) => {

          if (!id) {

            return of(CustomerFormActions.initFormDataSuccess({ customer: null }));
          }

          return this.customerService.getById(Number(id), 'GetCustomer')
            .pipe(
              map(customer => CustomerFormActions.initFormDataSuccess({ customer })),
              catchError(error => of(CustomerFormActions.initFormDataFailure(
                {

                  error: error.message || 'Failed to load customer data'
                }
              )))
            );
        })
      )
  );

  // Submit Form Data
  submitForm$ = createEffect(() =>
    this.actions$
  .pipe(
      ofType(CustomerFormActions.submitForm),
      mergeMap(({ customer, isEdit }) => {
        const request = isEdit
          ? this.customerService.update(customer, customer.id!.toString(), 'updateCustomer')
          : this.customerService.create(customer, 'CreateNewCustomer');

        return request.pipe(
          map(response => CustomerFormActions.submitFormSuccess({
            customer: response,
            isEdit: isEdit
          })),
          catchError(error => of(CustomerFormActions.submitFormFailure({
            error: error.error?.message || error.message || 'Failed to submit customer data'
          })))
        );
      })
    )
  );

    // Success message and navigation
    submitSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CustomerFormActions.submitFormSuccess),
        tap(({ customer, isEdit }) => {
          const actionType = isEdit ? 'updated' : 'created';
          const message = `Customer has been ${actionType} successfully`;

          this.dialogService.openDialog(
            {
              type: 'success',
              title: `${isEdit ? 'Update' : 'Create'} Operation Success ❇️`,
              message
            },
            ActionTrackingDialogComponent
          );
          if (isEdit) {
            this.router.navigate(['/']);
          }
        })
      ),
      { dispatch: false }
    );


  loadCustomerTypes$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(CustomerFormActions.loadCustomerTypes),
        mergeMap(() =>
          this.customerTypesService.getAll('GetAllCustomerTypes')
            .pipe(
              map(types => CustomerFormActions.loadCustomerTypesSuccess({ types })),
              catchError(error => of(CustomerFormActions.loadCustomerTypesFailure(
                {
                  error: error.message || 'Failed to load customer types'
                })))
            )
        )
      )
  );

  loadAddressTypes$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(CustomerFormActions.loadAddressTypes),
        mergeMap(() =>
          this.addressTypesService.getAll('GetAllAddressTypes')
            .pipe(
              map(types => CustomerFormActions.loadAddressTypesSuccess({ types })),
              catchError(error => of(CustomerFormActions.loadAddressTypesFailure({
                error: error.message || 'Failed to load address types'
              })))
            )
        )
      )
  );

  loadAllTypes$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(CustomerFormActions.loadAllTypes),
        mergeMap(() =>
          combineLatest([
            this.customerTypesService.getAll('GetAllCustomerTypes'),
            this.addressTypesService.getAll('GetAllAddressTypes')
          ])
            .pipe(
              map(([customerTypes, addressTypes]) =>
                CustomerFormActions.loadAllTypesSuccess({ customerTypes, addressTypes })),
              catchError(error => of(CustomerFormActions.loadAllTypesFailure({
                error: error.message || 'Failed to load types'
              })))
            )
        )
      )
  );

  // Handling error messages
  submitFailure$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(CustomerFormActions.submitFormFailure),
        tap(({ error }) => {
          this.dialogService.openDialog(
            {
              type: 'error',
              title: 'Error 📛',
              message: error
            },
            ActionTrackingDialogComponent
          );
        })
      ),
    { dispatch: false }
  );
}
