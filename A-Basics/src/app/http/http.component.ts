import {Component, OnInit} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

@Component({
  selector: 'app-http',
  template: `
    <div>
      <button class="btn btn-primary" (click)="onGetAll()">Get All</button>
      <button class="btn btn-primary" (click)="onGetOne()">Get One</button>
      <button class="btn btn-primary" (click)="onGetError()">Get Error</button>
      <button class="btn btn-primary" (click)="onPost()">Post (create)</button>
      <button class="btn btn-primary" (click)="onPut()">Put (update)</button>
    </div>
    <div>
      <span>{{onePost | async}}</span>
    </div>
  `,
  styles: []
})
export class HttpComponent implements OnInit {

  public onePost;
  private root = 'https://jsonplaceholder.typicode.com';

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.onePost = this.getOne();
  }

  onGetAll() {
    this.http.get(this.root + '/posts')
      .subscribe(
        (response: Response) => {
          console.log(response.statusText, response.json());
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('done');
        }
      );
  }

  onGetOne() {
    this.http.get(this.root + '/posts/1')
      .map((response: Response) => {
        return response.json();
      })
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('done');
        }
      );
  }

  onGetError() {
    this.http.get(this.root + '/posts/1111')
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (response: Response) => {
          console.log('error', response.status, response.json());
        },
        () => {
          console.log('done');
        }
      );
  }

  onPost() {
    const doc = {title: 'lorem', body: 'lorem'};
    const header = new Headers({'Content-Type': 'application/json'});

    this.http.post(this.root + '/posts', doc, {headers: header})
      .subscribe(
        (response: Response) => {
          console.log(response.statusText, response.json());
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('done');
        }
      );
  }

  onPut() {
    const doc = {title: 'lorem', body: 'lorem'};
    const header = new Headers({'Content-Type': 'application/json'});

    this.http.put(this.root + '/posts/1', doc, {headers: header})
      .subscribe(
        (response: Response) => {
          console.log(response.statusText, response.json());
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('done');
        }
      );
  }

  getOne() {
    return this.http.get(this.root + '/posts/1')
      .map((response: Response) => {
        return response.json().title;
      });
  }
}
