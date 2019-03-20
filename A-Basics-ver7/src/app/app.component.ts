import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  text = '';
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
}
