import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  text: string = "";
  list: string[] = ["Maciek", "Madzia"];
  title: string = "Hello Angular!";
  value: number = 23;

  constructor() {
    console.log('3. AppComponent.constructor');
  }

  ngOnInit() {
    console.log('4. AppComponent.ngOnInit');
  }

  getTextColor() {
    return this.text ? 'white' : 'orange';
  }
}
