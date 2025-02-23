import { Inject, Injectable } from '@angular/core';
import { CustomerTypes } from '../../models/customerTypes.model';
import { GenericTypesService } from '../genericAction/generic-types.service';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG, ApiConfig } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})

// Extends the generic GenericTypesService class and provides a service.
// Performs calls according to the controller name given to it.
export class CustomerTypesService extends GenericTypesService<CustomerTypes> {

  protected controllerName = 'customerTypes';
  constructor(
    // Direct HttpClient injection
    @Inject(HttpClient) http: HttpClient,
    // Direct HttpClient injection
    @Inject(API_CONFIG) config: ApiConfig
  ) {
    super(http, config);
  }
}
