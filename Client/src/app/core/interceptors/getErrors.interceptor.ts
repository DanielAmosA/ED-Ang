import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


// Designed to catch HTTP errors,
// process the error messages,
// and send the error clearly to the developer or user.
export const getErrorsInterceptor : HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server error
        switch (error.status) {
          case 400:
            errorMessage = error.error.message || error.message || 'Invalid request data';
            break;
          case 404:
            errorMessage = error.error.message || error.message || 'Resource not found';
            break;
          case 409:
            errorMessage = error.error.message || error.message || 'name already exists';
            break;
          case 500:
            errorMessage = error.error.message || error.message || 'Internal server error';
            break;
          default:
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            break;
        }
      }

      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
