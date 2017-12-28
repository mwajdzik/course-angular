import {Injectable} from '@angular/core';

@Injectable()
export class LoggingService {

  info(text: string) {
    console.log(text);
  }
}
