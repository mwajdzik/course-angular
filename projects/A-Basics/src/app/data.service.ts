import {Injectable} from "@angular/core";

@Injectable()
export class DataService {

  getFruit() {
    return new Promise<string[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(['Apple', 'Orange']);
      }, 2500);
    })
  }
}
