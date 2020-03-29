import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-data-binding',
  template: `
    <div>
      <label style="width: 100%">
        Add new:
        <input #newPersonEl
               type="text"
               class="form-control"
               style="width: 100%"
               [(ngModel)]="newFruit"
               (keyup.enter)="onEnter(newPersonEl.value)"/>
      </label>
    </div>
    <br>
    <div>
      <ul class="list-group">
        <li *ngFor="let f of fruit; let i = index" class="list-group-item">
          <span>{{i + 1}}. {{f}}</span>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    ul {
      height: 200px;
      overflow-y: scroll;
      list-style-type: none;
      margin: 0;
      padding: 0 5px 0 0;
    }

    .form-control {
      width: 15em;
    }
  `]
})
export class DataBindingComponent {

  @Input() fruit: string[];
  @Output() fruitAdded = new EventEmitter<string>();

  public newFruit: string;

  constructor(private loggingService: LoggingService) {
    loggingService.info('4. data-binding.component.ts - DataBindingComponent.constructor');
  }

  onEnter(fruit: string) {
    if (fruit !== '') {
      this.newFruit = '';
      this.fruitAdded.emit(fruit);
    }
  }
}
