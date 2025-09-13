import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { loggingInterceptor } from './app/interceptors/logging.interceptor';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './app/utils/global-error-handler';

bootstrapApplication(AppComponent, {
  providers: [
  provideRouter(APP_ROUTES),
  provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor])),
  { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
}).catch(err => console.error(err));
