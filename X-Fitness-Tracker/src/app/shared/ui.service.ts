import {Subject} from 'rxjs/Subject';
import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class UIService {

  loadingStateChanged = new Subject<boolean>();

  constructor(private matSnackbar: MatSnackBar) {
  }

  showSnackbar(message: string, action: string, duration: number) {
    this.matSnackbar.open(message, action, {duration});
  }
}
