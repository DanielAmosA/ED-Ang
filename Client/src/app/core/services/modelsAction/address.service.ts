import { Inject, Injectable } from '@angular/core';
import { Addresses } from '../../models/addresses.model';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG, ApiConfig } from '../../../config/api.config';
import { GenericApiActionService } from '../genericAction/generic-api-action.service';

@Injectable({
  providedIn: 'root'
})

// Extends the generic GenericApiActionService class and provides a service.
// Performs calls according to the controller name given to it.
export class AddressService extends GenericApiActionService<Addresses> {

  protected controllerName = 'addresses';
  constructor(
    // Direct HttpClient injection
    @Inject(HttpClient) http: HttpClient,
    // Direct API_CONFIG injection
    @Inject(API_CONFIG) config: ApiConfig) {
    super(http, config);
  }
}
