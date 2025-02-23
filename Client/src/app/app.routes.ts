import { Routes } from '@angular/router';

export const routes: Routes = [

  // Enables a lazy loading technique,
  // in which components are loaded only when needed,
  // which helps improve application performance.
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'customerMain/:id',
    loadComponent: () =>
      import('./features/customer-main-form/customer-main-form.component').then((m) => m.CustomerMainFormComponent),
  },

  {
    path: 'customerMain',
    loadComponent: () =>
      import('./features/customer-main-form/customer-main-form.component').then((m) => m.CustomerMainFormComponent),
  },

  { path: '404',
    loadComponent: () =>
      import('./features/page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent)},
  { path: '**', redirectTo: '/404' },

];
