import {Component, OnInit} from '@angular/core';
import {LoggingService} from "./logging.service";
import {DataService} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public fruit = [];
  public newFruit = '';
  public item = null;

  constructor(private loggingService: LoggingService,
              private dataService: DataService) {
    loggingService.info('3. app.component.ts - AppComponent.constructor');
  }

  ngOnInit(): void {
    this.dataService.getFruit()
      .then(fruit => {
        this.loggingService.info('New fruit was retrieved');
        this.fruit = fruit;
      });
  }

  fruitAdded(fruit: string) {
    this.loggingService.info('A new fruit was added: ' + fruit);
    this.newFruit = fruit;
    this.fruit = [...this.fruit, fruit]
  }

  getTextColor() {
    return 'grey';
  }

  onClearButtonClick(event: MouseEvent) {
    this.loggingService.info('Clear button clicked');
    this.newFruit = '';
    this.fruit = [];
  }

  newItemCreated(item: { name: string, content: string }) {
    this.item = item;
  }
}
