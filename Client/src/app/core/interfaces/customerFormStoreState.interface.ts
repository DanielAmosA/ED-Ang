import { AddressTypes } from "../models/addressTypes.model";
import { Customer } from "../models/customer.model";
import { CustomerTypes } from "../models/customerTypes.model";
import { FormState } from "./formState.interface";
import { LoadingState } from "./loadingState.interface";

// The interface responsible for the structure declaration of the customer Form Store State
export interface CustomerFormStoreState {
  loading: LoadingState;
  formState: FormState;
  customerTypes: CustomerTypes[];
  addressTypes: AddressTypes[];
  error: string | null;
}
