import { Base } from "./base.model";

// The interface responsible for the structure declaration of the contact entity
export interface Contact extends Base {
  fullName: string;
  officeNumber?: string;
  email?: string;
  customerId: number;
}
