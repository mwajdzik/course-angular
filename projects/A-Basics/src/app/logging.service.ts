import {EventEmitter, Injectable, Output} from "@angular/core";

@Injectable()
export class LoggingService {

  @Output() log = new EventEmitter<string>();

  info(message: string) {
    console.log(message);
    this.log.emit(message);
  }
}
