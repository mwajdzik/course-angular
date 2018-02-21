import {Component} from '@angular/core';

@Component({
    template: `<h1>{{text}}</h1>`,
    styles: ['h1 {color: red}']
})
export class HomeComponent {
    text = 'Home';
}
