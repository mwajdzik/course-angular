import {Injectable} from '@angular/core';

@Injectable()
export class TestService {

  getQuote(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do');
      }, 1000);
    });
  }
}
