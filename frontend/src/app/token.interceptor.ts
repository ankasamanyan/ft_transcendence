import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const trToken = localStorage.getItem('tr_access_token')
    // //console.log("accessToken = ", trToken);
    // //console.log("I'm in interceptor")
    if(trToken){
      request = request.clone(
          {
            setHeaders: {Authorization: `Bearer ${localStorage.getItem('tr_access_token')}`},
          })
    }

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {

      if (event instanceof HttpResponse) {

        // do stuff with response
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {

        // do stuff with error
      }
    }))





  }
}
