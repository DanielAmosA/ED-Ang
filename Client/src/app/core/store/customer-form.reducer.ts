import { createFeature, createReducer, on } from '@ngrx/store';
import { CustomerFormActions } from './customer-form.actions';
import { initialCustomerFormState } from './InitialCustomerForm.state';

// Handles changing the state of customerForm using
// actions and the functions that trigger them (reducers).
export const customerFormFeature = createFeature({
  name: 'customerForm',
  reducer: createReducer(
    initialCustomerFormState,

    // Update Loading State
    on(CustomerFormActions.updateLoadingState, (state, { state: loadingState }) => ({
      ...state,
      loading: loadingState
    })),

    // Update Form State
    on(CustomerFormActions.updateFormState, (state, { state: formState }) => ({
      ...state,
      formState: {
        ...state.formState,
      }
    })),

    // Initial Form State
    on(CustomerFormActions.initFormData, (state) => ({
      ...state,
      loading: {
        isLoading: true,
        isErroring: false,
        loadDataMsg: 'Loading initial data...'
      }
    })),

    // Initial Form Data With Success
    on(CustomerFormActions.initFormDataSuccess, (state, { customer }) => ({
      ...state,
      loading: {
        isLoading: false,
        isErroring: false,
        loadDataMsg: ''
      },
      formState: {
        ...state.formState,
        customerData: customer ? {
          ...customer,
          addresses: customer.addresses || [],
          contacts: customer.contacts || []
        } : null,
        isEditMode: !!customer
      }
    })),

     // Initial Form Data With Failure
    on(CustomerFormActions.initFormDataFailure, (state, { error }) => ({
      ...state,
      loading: {
        isLoading: false,
        isErroring: true,
        loadDataMsg: error
      }
    })),

     // Load Customer Types
     on(CustomerFormActions.loadCustomerTypes, (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isLoading: true,
        loadDataMsg: 'Loading customer types...'
      }
    })),

    // Load Customer Types With Success
    on(CustomerFormActions.loadCustomerTypesSuccess, (state, { types }) => ({
      ...state,
      customerTypes: types,
      loading: {
        ...state.loading,
        isLoading: false,
        loadDataMsg: ''
      }
    })),

    // Load Customer Types With Failure
    on(CustomerFormActions.loadCustomerTypesFailure, (state, { error }) => ({
      ...state,
      loading: {
        isLoading: false,
        isErroring: true,
        loadDataMsg: error
      }
    })),

    // Load Address Types
    on(CustomerFormActions.loadAddressTypes, (state) => ({
      ...state,
      loading: {
        ...state.loading,
        isLoading: true,
        loadDataMsg: 'Loading address types...'
      }
    })),

    // Load Address Types With Success
    on(CustomerFormActions.loadAddressTypesSuccess, (state, { types }) => ({
      ...state,
      addressTypes: types,
      loading: {
        ...state.loading,
        isLoading: false,
        loadDataMsg: ''
      }
    })),

     // Load Address Types With Failure
    on(CustomerFormActions.loadAddressTypesFailure, (state, { error }) => ({
      ...state,
      loading: {
        isLoading: false,
        isErroring: true,
        loadDataMsg: error
      }
    })),

    // Load All Initial Types
    on(CustomerFormActions.loadAllTypes, (state) => ({
      ...state,
      loading: {
        isLoading: true,
        isErroring: false,
        loadDataMsg: 'Loading all types...'
      }
    })),

    // Load All Initial Types With Success
    on(CustomerFormActions.loadAllTypesSuccess, (state, { customerTypes, addressTypes }) => ({
      ...state,
      customerTypes,
      addressTypes,
      loading: {
        isLoading: false,
        isErroring: false,
        loadDataMsg: ''
      }
    })),

    // Load All Initial Types With Failure
    on(CustomerFormActions.loadAllTypesFailure, (state, { error }) => ({
      ...state,
      loading: {
        isLoading: false,
        isErroring: true,
        loadDataMsg: error
      }
    })),

     // Submit Form
    on(CustomerFormActions.submitForm, (state) => ({
      ...state,
      formState: {
        ...state.formState,
        isSubmitting: true
      }
    })),

     // Submit Form With Success
    on(CustomerFormActions.submitFormSuccess, (state) => ({
      ...state,
      formState: {
        ...state.formState,
        isSubmitting: false
      },
      error: null
    })),

     // Submit Form With Failure
    on(CustomerFormActions.submitFormFailure, (state, { error }) => ({
      ...state,
      formState: {
        ...state.formState,
        isSubmitting: false
      },
      error
    })),

     // Reset Form Data
    on(CustomerFormActions.resetFormData, () => initialCustomerFormState),

    // Clear Form Errors
    on(CustomerFormActions.clearFormErrors, (state) => ({
      ...state,
      error: null
    }))
  )
});
