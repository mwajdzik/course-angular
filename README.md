```
sudo npm install -g @angular/cli

ng new MY_PROJECT_NAME --prefix MY_PREFIX
ng serve -p 4300
ng build
```

https://github.com/angular/angular-cli
https://github.com/angular/angular-cli/wiki

https://augury.angular.io/

```
ng --help

ng generate component other             (ng g c other)
     --flat -is -it
     --inline-styles
     --inline-template
     --spec false

ng generate class recipe                (ng g cl recipe)
ng g directive name
ng g service name
ng g route name --lazy false

ng destroy component other
ng destroy component other --flat

ng lint
ng test

ng build -prod
ng build -prod --aot   (ahead of time - smaller final package size)

ng github-pages:deply  (public repo when creating a key)

ng test
```

npm install --save bootstrap

Modify .angular-cli.json to include it in styles section.


## Lifecycle:

- index.html loads main.ts
- loads app.module.ts
- loads app.component.ts


## Components:

```
@Component({
  selector: 'rb-component',
  template: `...`,
  templateUrl: './app.component.html',
  styleUrls: [...],
  styles: [``]
})
```

- selector: 'rb-component'          tag
- selector: '[rb-component]'        attribute
- selector: '.rb-component'         class


## Data binding methods:

- String interpolation      {{expression resolving to string}}
- Property binding          <button [disabled]="expression">
- Event binding             <button (click)="onClick($event)">
- Two-Way data binding      <input [(ngModel)]="bind model">            - combination of property and event binding
                                                                          ngModel directive requires FormsModule from @angular/forms

- [sth]="passing expression"
- sth="passing string only"


## Directives:
- attribute - interact with the element (ngClass, ngStyle)
- structural - interact with the current view container and change the structure of the DOM (ngIf, ngFor, ngSwitch)   
             - leading *, only one structural directive is allowed on a given element


## Services:
- depending on the level of definition we can have a single or multiple instances of a servive
- defining in AppModule we will use the same instance application-wide
- number of services that are created is determined by number of providers: [OurService]


## Cross-component communication:
- add a service with @Output EventEmitter, and in the listening component subscribe to it


## Routing:
- app.modules.ts - RouterModule.forRoot(appRoutes)
- <router-outlet></router-outlet>
- children require their own <router-outlet></router-outlet>


## Forms:
- template driven approach


## Testing:
https://angular.io/docs/ts/latest/guide/testing.html
https://semaphoreci.com/community/tutorials/testing-components-in-angular-2-with-jasmine
