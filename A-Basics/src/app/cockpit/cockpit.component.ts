import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  template: `
    <div class="col-xs-6">
      <label>Item Name
        <input type="text" class="form-control" [(ngModel)]="newName" #localRef1>
      </label>
      <label>Content
        <input type="text" class="form-control" [(ngModel)]="newContent" #localRef2>
      </label>
    </div>
    <div class="col-xs-6">
      <!-- Option #1 - ngModel directive -->
      <button class="btn btn-primary" (click)="onAddItem()">Add</button>

      <!-- Option #2 - local references -->
      <button class="btn btn-primary" (click)="onAddItemWithRefs(localRef1, localRef2)">
        Add with local refs
      </button>

      <!-- Option #3 - ViewChild -->
      <button class="btn btn-primary" (click)="onAddItemWithViewChild()">
        Add with ViewChild
      </button>
    </div>
  `,
  styles: [`
    .btn {
      margin-top: 18px;
      margin-right: 10px;
    }

    label {
      padding-right: 10px;
    }
  `]
})
export class CockpitComponent {

  newName = '';
  newContent = '';

  @Output() private itemCreated = new EventEmitter<{ name: string, content: string , type: string }>();

  // static: true if not used in ngOnInit
  @ViewChild('localRef1', {static: true}) private newNameRef: ElementRef;
  @ViewChild('localRef2', {static: true}) private newContentRef: ElementRef;

  constructor() {
    console.log('8. cockpit.component.ts - CockpitComponent.constructor');
  }

  onAddItem() {
    this.itemCreated.emit({
      name: this.newName,
      content: this.newContent,
      type: 'ngModel'
    });
  }

  onAddItemWithRefs(localRef1: HTMLInputElement, localRef2: HTMLInputElement) {
    this.itemCreated.emit({
      name: localRef1.value,
      content: localRef2.value,
      type: 'Local References'
    });
  }

  onAddItemWithViewChild() {
    this.itemCreated.emit({
      name: this.newNameRef.nativeElement.value,
      content: this.newContentRef.nativeElement.value,
      type: 'ViewChild'
    });
  }
}
