import { Customer } from "../models/customer.model";

// The interface responsible for the structure declaration of the Customers State
export interface CustomersState {
  customers: Customer[];
  totalCustomers: number;
  currentPage: number;
  pageSize: number;
}
