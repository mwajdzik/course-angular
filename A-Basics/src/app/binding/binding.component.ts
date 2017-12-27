import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-binding',
  template: `
    <div>
      <div>Binding test. The value is {{value}}.</div>
      <div>Press <button class="btn btn-primary" [disabled]="buttonDisabled()" (click)="doubleValue()">me</button></div>
      <div>Enter some text <input type="text" class="form-control" (input)="onUpdateText($event)"></div>
      <div>Your name <input type="text" class="form-control" [(ngModel)]="name"></div>
      <div>You entered: {{name}}</div>
    </div>
  `,
  styles: [`
    div {
      padding-bottom: 10px;
    }
  `]
})
export class BindingComponent {

  // property binding:  [property]="data"
  // event binding:     (event)="expression"
  // two-way binding:   [(ngModel)]="data"

  @Input() value;

  name: string = "";

  buttonDisabled() {
    return this.value > 100;
  }

  doubleValue() {
    this.value += this.value;
  }

  onUpdateText(event: any) {
    this.name = event.target.value;
  }
}
