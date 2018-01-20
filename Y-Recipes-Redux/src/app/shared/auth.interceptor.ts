import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducers';
import {AuthState} from '../auth/store/auth.reducers';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth')
      .take(1)
      .switchMap((authState: AuthState) => {
        return next.handle(req.clone({params: req.params.set('auth', authState.token)}));
      });
  }
}
