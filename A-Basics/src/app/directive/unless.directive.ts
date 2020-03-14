import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  // property setter called each time a value changes
  @Input()
  set appUnless(condition: boolean) {
    console.log('   unless.directive.ts - appUnless: ' + condition);

    if (condition) {
      this.viewContainerRef.clear();
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
    console.log('7. unless.directive.ts - UnlessDirective.constructor');
  }
}
