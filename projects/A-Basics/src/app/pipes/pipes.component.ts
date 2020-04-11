import {Component} from '@angular/core';

@Component({
  selector: 'app-pipes',
  template: `
    <div>
      <div>{{instanceType | uppercase}}</div>
      <div>{{instanceType | shorten: 5}}</div>
      <div>{{date | date: 'yyyy-MM-dd HH:mm'}}</div>
      <div>{{date | date: 'fullDate'}}</div>
      <div>{{date | date: 'fullDate' | uppercase}}</div>
    </div>
  `,
  styles: [`
  `]
})
export class PipesComponent {
  instanceType = 'large instance';
  date = new Date();
}
