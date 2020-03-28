import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-data-binding',
  template: `
    <div>
      <ul class="list-group">
        <li *ngFor="let person of persons; let i = index" class="list-group-item">
          <span>{{i + 1}}. {{person}}</span>
        </li>
      </ul>
    </div>
    <br>
    <div>
      <label>
        Add a New Person:
        <input #newPersonEl
               type="text"
               class="form-control"
               [(ngModel)]="newPerson"
               (keyup.enter)="onEnter(newPersonEl.value)"/>
      </label>
    </div>
  `,
  styles: [`
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    .form-control {
      width: 15em;
    }
  `]
})
export class DataBindingComponent {
  /*
      String Interpolation    {{ data }}

      Property Binding        [property]="data"

                              it's not the same as using a directive, eg. [ngStyle]

      Event Binding           (even)="expression"

                              (input)="onAction($event)"

                              onAction(event: Event) {
                                (<HTMLInputElement>event.target).value
                              }

      TwoWay Binding          [(ngModel)]="data"
   */
  @Input() persons: string[];
  @Output() newPersonAdded = new EventEmitter<string>();

  public newPerson: string;

  constructor() {
    console.log('4. data-binding.component.ts - DataBindingComponent.constructor');
  }

  onEnter(person: string) {
    console.log('onEnter');

    if (person !== '') {
      this.persons.push(person);
      this.newPerson = '';
      this.newPersonAdded.emit(person);
    }
  }
}