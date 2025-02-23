import { Inject, Injectable } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG, ApiConfig } from '../../../config/api.config';
import { GenericApiActionService } from '../genericAction/generic-api-action.service';

@Injectable({
  providedIn: 'root'
})

// Extends the generic GenericApiActionService class and provides a service.
// Performs calls according to the controller name given to it.
export class ContactService extends GenericApiActionService<Contact> {

  protected controllerName = 'contact';
  constructor(
    // Direct HttpClient injection
    @Inject(HttpClient) http: HttpClient,
    // Direct HttpClient injection
    @Inject(API_CONFIG) config: ApiConfig) {
    super(http, config);
  }
}
