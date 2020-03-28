import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

import {environment} from '../../../Y-Recipes/src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp(environment.firebase);
  }
}
