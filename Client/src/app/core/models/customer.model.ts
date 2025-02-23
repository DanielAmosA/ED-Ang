import { Addresses } from "./addresses.model";
import { Base } from "./base.model";
import { Contact } from "./contact.model";

// The interface responsible for the structure declaration of the customer types entity
export interface Customer extends Base {
  name: string;
  customerNumber: string;
  customerTypeID:number;
  addresses?: Addresses[];
  contacts?: Contact[];
}
