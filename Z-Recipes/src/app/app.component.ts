import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private selectedFeature = 'recipe';

  selectFeature(feature: string) {
    this.selectedFeature = feature;
  }
}
