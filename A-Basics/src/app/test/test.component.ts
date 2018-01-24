import {Component, OnInit} from '@angular/core';
import {TestService} from './test.service';

@Component({
  selector: 'app-quote',
  template: `<p class="test"><i>{{quote}}</i></p>`,
  providers: [TestService]
})
export class TestComponent implements OnInit {

  quote = '...';

  constructor(private testService: TestService) {
  }

  ngOnInit(): void {
    this.testService.getQuote()
      .then(quote => this.quote = quote);
  }
}
