import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = performance.now();
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const time = (performance.now() - started).toFixed(0);
          // eslint-disable-next-line no-console
            console.log(`[HTTP] ${req.method} ${req.url} (${event.status}) ${time}ms`);
        }
      },
      error: (err) => {
        const time = (performance.now() - started).toFixed(0);
        // eslint-disable-next-line no-console
        console.error(`[HTTP ERROR] ${req.method} ${req.url} ${time}ms`, err);
      }
    })
  );
};
