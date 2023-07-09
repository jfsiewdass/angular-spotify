import { enableProdMode, importProvidersFrom } from '@angular/core';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { InjectSessionInterceptor } from '@core/interceptors/inject-session.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { provideRouter } from '@angular/router';
import { authorizationInverceptor } from '@core/interceptors/session.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule),
        provideRouter(appRoutes),
        CookieService,
        provideHttpClient(withInterceptors([
          authorizationInverceptor
        ]))
    ]
})
  .catch(err => console.error(err));
