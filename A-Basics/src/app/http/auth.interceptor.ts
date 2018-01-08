import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const copiedReq = req.clone({
      headers: req.headers.set('token', 'TOKEN'),
      params: req.params.set('auth', 'AUTH')
    });

    return next.handle(copiedReq);
  }
}
