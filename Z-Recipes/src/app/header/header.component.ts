import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output('feature') newFeatureEmitter = new EventEmitter();

  onFeatureSelect(featureName: string) {
    this.newFeatureEmitter.emit(featureName);
  }
}
