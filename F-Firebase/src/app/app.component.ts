import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemValue = '';
  items: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
  }

  onSubmit() {
    this.db.collection('items').add({content: this.itemValue});
    this.itemValue = '';
  }
}
