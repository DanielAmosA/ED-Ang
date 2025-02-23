import { createFeature, createReducer, on } from '@ngrx/store';
import { CustomerActions } from './customer.actions';
import { initialCustomerState } from './InitialCustomer.state';

// Handles changing the state of customer using
// actions and the functions that trigger them (reducers).
export const customerFeature = createFeature({
  name: 'customer',
  reducer: createReducer(
    initialCustomerState,

    // Load Customers
    on(CustomerActions.loadCustomers, (state) =>
    ({
      ...state,
      loading: true,
      error: null
    })),

    // Load Customers With Success
    on(CustomerActions.loadCustomersSuccess, (state, { response }) =>
    ({
      ...state,
      customers: response.data,
      totalCustomers: response.total,
      currentPage: response.page - 1,
      pageSize: response.pageSize,
      loading: false,
      error: null
    })),

    // Load Customers With Failure
    on(CustomerActions.loadCustomersFailure, (state, { error }) =>
    ({
      ...state,
      loading: false,
      error
    })),

    // Load Single Customer
    on(CustomerActions.loadCustomer, (state) =>
    ({
      ...state,
      loading: true,
      error: null
    })),

    // Load Single Customer With Success
    on(CustomerActions.loadCustomerSuccess, (state, { customer }) =>
    ({
      ...state,
      selectedCustomer: customer,
      loading: false,
      error: null
    })),

    // Load Single Customer With Failure
    on(CustomerActions.loadCustomerFailure, (state, { error }) =>
    ({
      ...state,
      loading: false,
      error
    })),

    // Create Customer
    on(CustomerActions.createCustomer, (state) =>
    ({
      ...state,
      loading: true,
      error: null
    })),

    // Create Customer With Success
    on(CustomerActions.createCustomerSuccess, (state, { customer }) =>
    ({
      ...state,
      customers: [...state.customers, customer],
      selectedCustomer: customer,
      loading: false,
      error: null
    })),

    // Create Customer With Failure
    on(CustomerActions.createCustomerFailure, (state, { error }) =>
    ({
      ...state,
      loading: false,
      error
    })),

    // Update Customer
    on(CustomerActions.updateCustomer, (state) =>
    ({
      ...state,
      loading: true,
      error: null
    })),

    // Update Customer With Success
    on(CustomerActions.updateCustomerSuccess, (state, { customer }) =>
    ({
      ...state,
      customers: state.customers.map(c => c.id === customer.id ? customer : c),
      selectedCustomer: customer,
      loading: false,
      error: null
    })),

    // Update Customer With Failure
    on(CustomerActions.updateCustomerFailure, (state, { error }) =>
    ({
      ...state,
      loading: false,
      error
    })),

    // Delete Customer
    on(CustomerActions.deleteCustomer, (state) =>
    ({
      ...state,
      loading: true,
      error: null
    })),

    // Delete Customer With Success
    on(CustomerActions.deleteCustomerSuccess, (state, { id }) =>
    ({
      ...state,
      customers: state.customers.filter(c => c.id !== id),
      loading: false,
      error: null
    })),

    // Delete Customer With Failure
    on(CustomerActions.deleteCustomerFailure, (state, { error }) =>
    ({
      ...state,
      loading: false,
      error
    })),

    // Load Customer Types
    on(CustomerActions.loadCustomerTypes, (state) =>
    ({
      ...state,
      loading: true,
      error: null
    })),

    // Load Customer Types With Success
    on(CustomerActions.loadCustomerTypesSuccess, (state, { types }) =>
    ({
      ...state,
      customerTypes: types,
      loading: false,
      error: null
    })),

    // Load Customer Types With Failure
    on(CustomerActions.loadCustomerTypesFailure, (state, { error }) =>
    ({
      ...state,
      loading: false,
      error
    })),

    // Load Address Types
    on(CustomerActions.loadAddressTypes, (state) =>
    ({
      ...state,
      loading: true,
      error: null
    })),

    // Load Address Types With Success
    on(CustomerActions.loadAddressTypesSuccess, (state, { types }) =>
    ({
      ...state,
      addressTypes: types,
      loading: false,
      error: null
    })),

    // Load Address Types With Failure
    on(CustomerActions.loadAddressTypesFailure, (state, { error }) =>
    ({
      ...state,
      loading: false,
      error
    })),

    // Reset Actions
    on(CustomerActions.resetCustomerState, () => initialCustomerState),

    // clearSelectedCustomer
    on(CustomerActions.clearSelectedCustomer, (state) =>
    ({
      ...state,
      selectedCustomer: null
    }))
  )
});
