import { CustomerFormStoreState } from '../interfaces/customerFormStoreState.interface';
// defines the initial state of a store for customers.

export const initialCustomerFormState: CustomerFormStoreState = {
  loading: {
    isLoading: false,
    isErroring: false,
    loadDataMsg: ''
  },
  formState: {
    isEditMode: false,
    isSubmitting: false,
    customerData: null
  },
  customerTypes: [],
  addressTypes: [],
  error: null
};
