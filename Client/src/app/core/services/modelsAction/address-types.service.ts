import { Inject, Injectable } from '@angular/core';
import { GenericTypesService } from '../genericAction/generic-types.service';
import { AddressTypes } from '../../models/addressTypes.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG, ApiConfig } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})

// Extends the generic GenericTypesService class and provides a service.
// Performs calls according to the controller name given to it.
export class AddressTypesService extends GenericTypesService<AddressTypes> {

  // The controller name for this API service is defined
  protected controllerName = 'addressTypes';
  constructor(
    // Direct HttpClient injection
    @Inject(HttpClient) http: HttpClient,
    // Direct API_CONFIG injection
    @Inject(API_CONFIG) config: ApiConfig
  ) {
    super(http, config);
  }

}
