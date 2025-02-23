import { Base } from "./base.model";

// The interface responsible for the structure declaration of the addresses entity
export interface Addresses extends Base {
  city:string;
  street:string;
  customerId:number;
  addressTypesID:number;
}
