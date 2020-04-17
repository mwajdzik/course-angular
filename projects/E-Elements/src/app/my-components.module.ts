import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {MultiComboboxComponent} from './multi-combobox/multi-combobox.component';
import {createCustomElement} from "@angular/elements";

@NgModule({
  declarations: [
    MultiComboboxComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
    MultiComboboxComponent
  ]
})
export class MyComponentsModule {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const customElement = createCustomElement(MultiComboboxComponent, {injector: this.injector});
    customElements.define('ro-multi-combobox', customElement);
  }
}
