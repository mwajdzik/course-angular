import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UsersService {

  // Subject - Observer and Observable at the same time
  // similar behavior to using EventEmitter - suggested to implement cross-component communication this way
  userActivated = new Subject();
}
