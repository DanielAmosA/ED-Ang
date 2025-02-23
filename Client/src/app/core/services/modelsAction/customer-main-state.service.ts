import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Contact } from '../../models/contact.model';
import { Addresses } from '../../models/addresses.model';

@Injectable({
  providedIn: 'root',
})

// Handles the state of the client, its addresses and contact information.
export class CustomerMainStateService {
  // Uses signals to track changes in the customer's status,
  // addresses, and contact information.
  private customerSt = signal<Customer | null>(null);
  private addressesSt = signal<Addresses[]>([]);
  private contactsSt = signal<Contact[]>([]);

  // update the customer status
  setCustomer(customer: Customer): void {
    this.customerSt.set(customer);
  }

  // update the addresses status
  setAddresses(addresses: Addresses[]): void {
    this.addressesSt.set(addresses);
  }

  // update the contact status
  setContacts(contacts: Contact[]): void {
    this.contactsSt.set(contacts);
  }

  // Returns the current customer
  get customer(): Customer | null {
    return this.customerSt();
  }

  // Returns the addresses
  get addresses(): Addresses[] {
    return this.addressesSt();
  }

  // Returns the contacts
  get contacts(): Contact[] {
    return this.contactsSt();
  }

  // Add new address
  addAddress(address: Addresses): void {
    const currentAddresses = this.addressesSt();
    this.addressesSt.set([...currentAddresses, address]);
  }

  // Add new contact
  addContact(contact: Contact): void {
    const currentContacts = this.contactsSt();
    this.contactsSt.set([...currentContacts, contact]);
  }
}
