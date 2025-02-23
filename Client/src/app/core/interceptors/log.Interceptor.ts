import { HttpHandler, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

// Record information about HTTP requests and responses.
// Useful for monitoring performance and logging issues with HTTP requests.
export const logInterceptor  : HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startTime;
          console.log(
            `${req.method} ${req.urlWithParams} ${event.status} - ${duration}ms`
          );
        }
      },
      error: (error) => {
        const duration = Date.now() - startTime;
        console.error(
          `${req.method} ${req.urlWithParams} ${error.status} - ${duration}ms`
        );
      },
    })
  );
};
