import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-data-binding',
  template: `
    <div>
      <label style="width: 100%">
        Add a New Person:
        <input #newPersonEl
               type="text"
               class="form-control"
               style="width: 100%"
               [(ngModel)]="newPerson"
               (keyup.enter)="onEnter(newPersonEl.value)"/>
      </label>
    </div>
    <br>
    <div>
      <ul class="list-group">
        <li *ngFor="let person of persons; let i = index" class="list-group-item">
          <span>{{i + 1}}. {{person}}</span>
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

  @Input() persons: string[];
  @Output() newPersonAdded = new EventEmitter<string>();

  public newPerson: string;

  constructor(private loggingService: LoggingService) {
    loggingService.info('4. data-binding.component.ts - DataBindingComponent.constructor');
  }

  onEnter(person: string) {
    if (person !== '') {
      this.persons.push(person);
      this.newPerson = '';
      this.newPersonAdded.emit(person);
    }
  }
}
