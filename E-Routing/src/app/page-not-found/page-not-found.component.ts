import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  template: `
    <h3>{{message}}</h3>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  message = 'This page was not found...';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.message = this.route.snapshot.data['message'] || this.message;
  }
}
