import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { customInterceptor } from './interceptor/custom.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';





export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideRouter(routes), provideHttpClient(withInterceptors([customInterceptor])), provideAnimationsAsync()
    , provideAnimations(), provideToastr({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      maxOpened: 5,
      autoDismiss: true,
      timeOut: 3000,
      progressBar: true,



    })]
};
