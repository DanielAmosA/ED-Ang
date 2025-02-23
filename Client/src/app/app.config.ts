import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { API_CONFIG } from './config/api.config';
import { environment } from '../environments/environment';
import { provideStore } from '@ngrx/store';
import { customerFormStoreProviders, customerStoreProviders } from './core/store/start';
import { getErrorsInterceptor } from './core/interceptors/getErrors.interceptor';
import { logInterceptor } from './core/interceptors/log.Interceptor';


export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes),
    provideClientHydration(),
    provideStore(),...customerStoreProviders,...customerFormStoreProviders,
    provideHttpClient(withFetch()), provideAnimationsAsync(),
    { provide: API_CONFIG, useValue: environment.apiConfig },
    provideHttpClient(
      withInterceptors([
        getErrorsInterceptor,
        logInterceptor
      ])
    )
  ]
};
