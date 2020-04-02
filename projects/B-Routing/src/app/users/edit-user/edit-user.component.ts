import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CanComponentDeactivate} from './can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-user',
  template: `
    <h3>Editing...</h3>
    <button class="btn btn-primary" (click)="onSaveChanges()">Save changes</button>
  `,
  styles: []
})
export class EditUserComponent implements CanComponentDeactivate {

  private changesSaved = false;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  onSaveChanges() {
    // ... saving logic
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesDetectedInForm() && !this.changesSaved) {
      return confirm('Do you want to discard your changes?');
    } else {
      return true;
    }
  }

  // noinspection JSMethodCanBeStatic
  private changesDetectedInForm() {
    return true;
  }
}
