import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styles: []
})
export class PipesComponent implements OnInit {

  servers = [
    {name: 'API', status: 'UP', started: new Date()},
    {name: 'DB', status: 'DOWN', started: new Date()}
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
