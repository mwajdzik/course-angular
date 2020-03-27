import {Component, OnInit} from '@angular/core';
import {LoggingService} from "./logging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [LoggingService]
})
export class AppComponent implements OnInit {

  item = null;
  caption = '';
  showText = false;
  clickCounter = 0;
  persons = ['Maciek', 'Madzia'];

  constructor(private loggingService: LoggingService) {
    console.log('3. app.component.ts - AppComponent.constructor');
    this.loggingService = loggingService;
  }

  ngOnInit() {
    console.log('9. app.component.ts - AppComponent.ngOnInit');
  }

  getTextColor() {
    return this.caption === '' ? 'white' : 'green';
  }

  personAdded(event) {
    console.log('personAdded: ' + event);
    this.caption = event + ' was just added!';
  }

  onOkButtonClick(event) {
    console.log('onOkButtonClick');
    this.clickCounter++;
    this.caption = `Button clicked ${this.clickCounter} times!`;
  }

  newItemCreated(item: { name: string, content: string }) {
    this.item = item;
    this.loggingService.logStatusChange('newItemCreated: ' + item);
  }
}
