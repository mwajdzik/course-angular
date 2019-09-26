import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  caption = '';
  showText = false;
  clickCounter = 0;
  persons = ['Maciek', 'Madzia'];

  constructor() {
    console.log('3. AppComponent.constructor');
  }

  ngOnInit() {
    console.log('4. AppComponent.ngOnInit');
  }

  getTextColor() {
    return this.caption === '' ? 'white' : 'orange';
  }

  personAdded(event) {
    this.caption = event + ' was just added!';
  }

  onOkButtonClick(event) {
    this.clickCounter++;
    this.caption = `Button clicked ${this.clickCounter} times!`;
  }
}
