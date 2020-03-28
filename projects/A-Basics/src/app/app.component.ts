import {Component} from '@angular/core';
import {LoggingService} from "./logging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  persons = ['Maciek', 'Madzia'];
  newPerson = '';

  constructor(private loggingService: LoggingService) {
    loggingService.info('3. app.component.ts - AppComponent.constructor');
  }

  personAdded(event) {
    this.loggingService.info('A new person added: ' + event);
    this.newPerson = event;
  }

  getTextColor() {
    return 'green';
  }

  onOkButtonClick(event: MouseEvent) {
    console.log(event);
  }
}
