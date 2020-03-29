import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-refs',
  template: `
    <div class="col-xs-6">
      <label>Item Name
        <input type="text" class="form-control" [(ngModel)]="name" #localRef1>
      </label>
      <label>Content
        <input type="text" class="form-control" [(ngModel)]="content" #localRef2>
      </label>
    </div>
    <div class="col-xs-6">
      <!-- Option #1 - ngModel directive -->
      <button class="btn btn-primary" (click)="onAddItem()">Add</button>
      <!-- Option #2 - local references -->
      <button class="btn btn-primary" (click)="onAddItemWithRefs(localRef1, localRef2)">Add with local refs</button>
      <!-- Option #3 - ViewChild -->
      <button class="btn btn-primary" (click)="onAddItemWithViewChild()">Add with ViewChild</button>
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
export class RefsComponent {

  name = '';
  content = '';

  @Output() private itemCreated = new EventEmitter<{ name: string, content: string, type: string }>();

  @ViewChild('localRef1') private newNameRef: ElementRef;
  @ViewChild('localRef2') private newContentRef: ElementRef;

  constructor(private loggingService: LoggingService) {
    loggingService.info('refs.component.ts - CockpitComponent.constructor');
  }

  onAddItem() {
    this.itemCreated.emit({
      name: this.name,
      content: this.content,
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
