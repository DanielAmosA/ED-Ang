import { AddressTypes } from "../models/addressTypes.model";
import { Customer } from "../models/customer.model";
import { CustomerTypes } from "../models/customerTypes.model";

// The interface responsible for the structure declaration of the Customer Store State
export interface CustomerStoreState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  customerTypes: CustomerTypes[];
  addressTypes: AddressTypes[];
  loading: boolean;
  error: string | null;
  totalCustomers: number;
  currentPage: number;
  pageSize: number;
}
