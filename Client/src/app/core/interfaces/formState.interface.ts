import { Customer } from "../models/customer.model";

export interface FormState {
  isEditMode: boolean;
  isSubmitting: boolean;
  customerData: Customer | null;
}
