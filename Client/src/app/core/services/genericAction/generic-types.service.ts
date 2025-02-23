import { Inject, inject, Injectable } from '@angular/core';
import { BaseType } from '../../models/baseType.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG, ApiConfig } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})

// API generically and can be used for many different types of models
// as long as they inherit from BaseType.
export abstract class GenericTypesService<TTypeService extends BaseType> {
  protected abstract controllerName: string;
  constructor(
    // Direct HttpClient injection
    @Inject(HttpClient) protected http: HttpClient,
    // Direct API_CONFIG injection
    @Inject(API_CONFIG) protected config: ApiConfig
  ) { }


  // API call for getting all details
  getAll(apiAction?: string): Observable<TTypeService[]> {
    const urlWithApiAction = `${this.config.apiUrl}/${this.controllerName}${apiAction ? `/${apiAction}` : ''}`;
    return this.http.get<TTypeService[]>(`${urlWithApiAction}`)
  }
}
