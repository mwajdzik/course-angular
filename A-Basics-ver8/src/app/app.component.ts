import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  text = '';
  counter = 0;
  persons = ['Maciek', 'Madzia'];

  constructor() {
    console.log('3. AppComponent.constructor');
  }

  ngOnInit() {
    console.log('4. AppComponent.ngOnInit');
  }

  getTextColor() {
    return this.text === '' ? 'white' : 'orange';
  }

  personAdded(event) {
    this.text = event + ' was just added!';
  }

  onOkButtonClick(event) {
    this.counter++;
    this.text = `Button clicked ${this.counter} times!`;
  }
}
