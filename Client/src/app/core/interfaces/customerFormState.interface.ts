import { Addresses } from "../models/addresses.model";
import { Contact } from "../models/contact.model";
import { Customer } from "../models/customer.model";
import { TButtonMode } from "../types/animation.type";

// The interface responsible for the structure declaration of the customer form state
export interface CustomerFormState {
  isEditMode: boolean;
  isSubmitting: boolean;
  customerData: {
    name: string;
    customerNumber: string;
    customerTypeID: number;
    addresses: Addresses[];
    contacts: Contact[];
  } | null;
}
