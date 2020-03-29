import {Directive, Input, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';
import {LoggingService} from "../logging.service";

// Structural Directive - modifies DOM

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  // property setter called each time a value changes
  @Input()
  set appUnless(condition: boolean) {
    this.loggingService.info('unless.directive.ts - appUnless: ' + condition);

    if (condition) {
      this.viewContainerRef.clear();
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private loggingService: LoggingService) {
    this.loggingService.info('unless.directive.ts - UnlessDirective.constructor');
  }
}
