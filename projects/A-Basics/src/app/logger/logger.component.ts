import {Component} from '@angular/core';
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-logger',
  template: `
    <div class="row">
      <label class="control-label">
        Log:
        <textarea class="form-control">{{log}}</textarea>
      </label>
    </div>
  `,
  styles: [`
    .row {
      padding: 0 1em;
    }

    .control-label {
      width: 100%;
    }

    textarea {
      height: 400px;
      font-family: Courier, serif;
    }
  `]
})
export class LoggerComponent {

  log = '';

  constructor(private loggingService: LoggingService) {
    loggingService.info('5. logger.component.ts - LoggerComponent.constructor - subscribing');

    loggingService.log.subscribe(message => {
      this.logMessage(message);
    })
  }

  private logMessage(message) {
    const now = new Date().toLocaleTimeString();
    message = `[${now}] ${message}`;
    this.log = `${message}\n${this.log}`;
  }
}
