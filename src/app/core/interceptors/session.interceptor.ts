import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

export const authorizationInverceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const cookieService = inject(CookieService)
    try {
        const token = cookieService.get('token')
        let newRequest = request
        newRequest = request.clone(
          {
            setHeaders: {
              authorization: `Bearer ${token}`,
              CUSTOM_HEADER: 'HOLA',
              VERSION_ANGULAR: 'HOLA'
            }
          }
        )
  
        return next(newRequest);
  
      } catch (e) {
        console.log('🔴🔴🔴 Ojito error', e)
        return next(request);
      }

}