import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from '../../models/base.model';
import { ApiActionResponse } from '../../interfaces/apiActionResponse.interface';
import { API_CONFIG, ApiConfig } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})

// API generically and can be used for many different types of models
// as long as they inherit from Base.
export abstract class GenericApiActionService<TModelService extends Base> {
  protected abstract controllerName: string;

  constructor(
    // Direct HttpClient injection
    @Inject(HttpClient) protected http: HttpClient,
    // Direct API_CONFIG injection
    @Inject(API_CONFIG) protected config: ApiConfig
  ) { }

  protected getApiUrlWithControllerAndAction(apiAction: string = ''): string {
    return `${this.config.apiUrl}/${this.controllerName}${apiAction ? `/${apiAction}` : ''
      }`;
  }

  // API call for creation
  create(entity: Partial<TModelService>, apiAction?: string): Observable<TModelService> {
    return this.http.post<TModelService>(
      this.getApiUrlWithControllerAndAction(apiAction),
      entity
    );
  }

  // API call for getting all details with page &  pageSize
  getAll(
    page: number,
    pageSize: number,
    apiAction?: string
  ): Observable<ApiActionResponse<TModelService>> {
    return this.http.get<ApiActionResponse<TModelService>>(this.getApiUrlWithControllerAndAction(apiAction), {
      params: { page, pageSize },
    });
  }

  // API call for getting an item
  getById(id: number, apiAction?: string): Observable<TModelService> {
    return this.http.get<TModelService>(this.getApiUrlWithControllerAndAction(apiAction), { params: { id } });
  }

  // API call for update
  update(
    entity: Partial<TModelService>,
    id?: string,
    apiAction?: string
  ): Observable<TModelService> {
    return this.http.put<TModelService>(`${this.getApiUrlWithControllerAndAction(apiAction)}${id ? `/${id}` : ''}`, entity);
  }

  // API call for deletion
  delete(id: number, apiAction?: string): Observable<void> {
    return this.http.delete<void>(this.getApiUrlWithControllerAndAction(apiAction), { params: { id } });
  }
}

