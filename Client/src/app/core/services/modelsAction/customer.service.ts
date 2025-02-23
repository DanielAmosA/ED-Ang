import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customer.model';
import { GenericApiActionService } from '../genericAction/generic-api-action.service';
import { API_CONFIG, ApiConfig } from '../../../config/api.config';

@Injectable({
  providedIn: 'root',
})

// Extends the generic GenericApiActionService class and provides a service.
// Performs calls according to the controller name given to it.
export class CustomerService extends GenericApiActionService<Customer> {

  protected controllerName = 'Customers';
  constructor(
    // Direct HttpClient injection
    @Inject(HttpClient) http: HttpClient,
    // Direct HttpClient injection
    @Inject(API_CONFIG) config: ApiConfig
  ) {
    super(http, config);
  }
}
