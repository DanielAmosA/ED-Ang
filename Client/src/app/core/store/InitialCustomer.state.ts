import { CustomerStoreState } from "../interfaces/customerStoreState.interface";

// defines the initial state of a store for customers.
export const initialCustomerState: CustomerStoreState = {
  customers: [],
  selectedCustomer: null,
  customerTypes: [],
  addressTypes: [],
  loading: false,
  error: null,
  totalCustomers: 0,
  currentPage: 0,
  pageSize: 10
};
