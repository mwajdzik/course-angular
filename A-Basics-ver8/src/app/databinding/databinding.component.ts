import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-databinding',
  template: `
    <div>
      All people ({{persons.length}}):
      <ul>
        <li *ngFor="let person of persons">
          {{person}}
        </li>
      </ul>
    </div>
    <br>
    <div>
      <input #newPersonEl
             type="text"
             class="form-control"
             [(ngModel)]="newPerson"
             (keyup.enter)="onEnter(newPersonEl.value)"/>
    </div>
  `,
  styles: [`
    div {
      margin: 0 0 0 20px;
      display: inline-block;
    }

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
export class DatabindingComponent {

  @Input() persons: string[];
  @Output() newPersonAdded = new EventEmitter<string>();

  public newPerson: string;

  onEnter(person: string) {
    if (person !== '') {
      this.persons.push(person);
      this.newPerson = '';
      this.newPersonAdded.emit(person);
    }
  }
}
