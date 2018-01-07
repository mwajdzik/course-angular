import {Component, OnInit} from '@angular/core';
import {
  HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpParams,
  HttpRequest
} from '@angular/common/http';

interface Post {
  title: string;
  body: string;
}

@Component({
  selector: 'app-http-client',
  template: `
    <h2>New Http Client Module</h2>
    <div>
      <button class="btn btn-primary" (click)="onGetAll()">Get All</button>
      <button class="btn btn-primary" (click)="onGetOne()">Get One</button>
      <button class="btn btn-primary" (click)="onGetError()">Get Error</button>
      <button class="btn btn-primary" (click)="onPost()">Post (create)</button>
      <button class="btn btn-primary" (click)="onPut()">Put (update)</button>
      <button class="btn btn-primary" (click)="onPutObserveEvents()">Put (Observe Events)</button>
      <button class="btn btn-primary" (click)="onPutProgress()">Put (Progress)</button>
    </div>
    <div>
      <span>{{onePost | async}}</span>
    </div>
  `,
  styles: []
})
export class HttpClientComponent implements OnInit {

  public onePost;
  private root = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.onePost = this.getOne();
  }

  onGetAll() {
    const params = new HttpParams().append('param', 'value');

    // responseType: json (default), text, blob (binary file), arraybuffer
    this.http.get<Post[]>(this.root + '/posts', {responseType: 'json', observe: 'body', params: params})
      .subscribe(
        (data: Post[]) => {
          console.log(data);
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
    this.http.get<Post>(this.root + '/posts/1')
      .subscribe(
        (data: Post) => {
          console.log(data);
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
        (data: Post) => {
          console.log(data);
        },
        (response: HttpErrorResponse) => {
          console.log('error', response.status, response.message);
        },
        () => {
          console.log('done');
        }
      );
  }

  onPost() {
    const doc = {title: 'lorem', body: 'lorem'};
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    this.http.post(this.root + '/posts', doc, {headers: headers})
      .subscribe(
        (data: Post) => {
          console.log(data);
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
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    this.http.put(this.root + '/posts/1', doc, {headers: headers})
      .subscribe(
        (data: Post) => {
          console.log(data);
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('done');
        }
      );
  }

  onPutObserveEvents() {
    const doc = {title: 'lorem', body: 'lorem'};
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    this.http.put(this.root + '/posts/1', doc, {observe: 'events', headers: headers})
      .subscribe(
        (data: HttpEvent<Object>) => {
          if (data.type === HttpEventType.Sent) {
            console.log('SENT:', data);
          } else if (data.type === HttpEventType.Response) {
            console.log('RESPONSE:', data);
          } else {
            console.log('OTHER:', data);
          }
        },
        () => {
          console.log('error');
        },
        () => {
          console.log('done');
        }
      );
  }

  onPutProgress() {
    const doc = {title: 'lorem', body: 'lorem'};
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const request = new HttpRequest('PUT', this.root + '/posts/1', doc, {reportProgress: true, headers: headers});

    this.http.request(request)
      .subscribe(
        (data: HttpEvent<Object>) => {
          if (data.type === HttpEventType.Sent) {
            console.log('SENT:', data);
          } else if (data.type === HttpEventType.Response) {
            console.log('RESPONSE:', data);
          } else if (data.type === HttpEventType.DownloadProgress) {
            console.log('DOWNLOAD:', data);
          } else if (data.type === HttpEventType.UploadProgress) {
            console.log('UPLOAD:', data);
          } else {
            console.log('OTHER:', data);
          }
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
    return this.http.get<Post>(this.root + '/posts/1')
      .map((post: Post) => {
        return post.title;
      });
  }
}
