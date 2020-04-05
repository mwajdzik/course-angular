import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class SubjectService {

  // instead of using EventEmitter
  subject = new Subject<string>();
}
