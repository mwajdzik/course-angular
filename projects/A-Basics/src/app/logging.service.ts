import {EventEmitter, Injectable, Output} from "@angular/core";

@Injectable()
export class LoggingService {

  @Output() log = new EventEmitter<string>();

  info(message: string) {
    this.log.emit(message);
    console.log(message);
  }
}
