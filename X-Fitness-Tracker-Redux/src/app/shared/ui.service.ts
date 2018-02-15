import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class UIService {

  constructor(private matSnackbar: MatSnackBar) {
  }

  showSnackbar(message: string, action: string, duration: number) {
    this.matSnackbar.open(message, action, {duration});
  }
}
