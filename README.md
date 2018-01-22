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

Modify .angular-cli.json to include it in styles section
    "../node_modules/bootstrap/dist/css/bootstrap.css"


## Lodash
npm install --save lodash
import * as _ from 'lodash'; 
 

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

- String interpolation      ```{{expression resolving to string}}```
- Property binding          ```<button [disabled]="expression">```
- Event binding             ```<button (click)="onClick($event)">```
- Two-Way data binding      ```<input [(ngModel)]="bind model">``` - combination of property and event binding
- ngModel directive requires FormsModule from @angular/forms

- [sth]="passing expression"
- sth="passing string only"


## Directives:
- attribute - interact with the element (ngClass, ngStyle)
- structural - interact with the current view container and change the structure of the DOM (ngIf, ngFor, ngSwitch)   
             - leading *, only one structural directive is allowed on a given element

## Pipes
- used to transform a value
- https://angular.io/api?type=pipe
- ``` {{ username | uppercase }} ```
- async pipe for Promises


## Services:
- depending on the level of definition we can have a single or multiple instances of a servive
- defining in AppModule we will use the same instance application-wide
- number of services that are created is determined by number of providers: [OurService]


## Cross-component communication:
- add a service with @Output EventEmitter, and in the listening component subscribe to it


## Routing:
- app.modules.ts - ```RouterModule.forRoot(appRoutes)```
- ```<router-outlet></router-outlet>```
- children require their own ```<router-outlet></router-outlet>```


## Forms:
- template driven approach - Angular infers the Form object from the DOM
- reactive - Form is created programmatically and synchronized with the DOM
    - custom validators
    - async validator
    - dynamic form
    - reacting to change (subscriptions)
- https://angular.io/api/forms/Validators


## Testing:
- ```ng test```
- https://angular.io/docs/ts/latest/guide/testing.html
- https://semaphoreci.com/community/tutorials/testing-components-in-angular-2-with-jasmine


## Material Design
https://material.angular.io/
npm install --save @angular/material @angular/cdk


## Deployment
- ng build --prod --aot 
- example.com/my-app      ```<base href="/my-app">```
- return index.html in case of 404 errors
- AWS S3 hosting https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html


## Firebase
- https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md
- npm install angularfire2 firebase --save


## Modules
- allow to lazy load modules
- options defined on route: NoPreloading, PreloadAllModules, or define own PreloadingStrategy
- shared module to keep common elements
- CanLoad guard can be used to revoke access to a route and avoid loading unnecessary files


## Ahead Of Time Compilation (oposite to JIT)
- what's compiled is HTML which is turned into JS
- faster startup since parsing and compilation doesn't happen in Browser
- templates get checked during development
- smaller file size as unused features can be stripped out and the compiler itself isn't shipped


## Redux - ngRx library for Angular that provides Redux functionality
- npm install --save @ngrx/store
- npm install --save @ngrx/effects
- npm install --save @ngrx/router-store
- npm install --save @ngrx/store-devtools  + Chrome Redux DevTools extension
- Store keeps the Application State
- Services and Components have access to the Store, they can still communicate with each other
- to modify the state we dispatch Actions (eg. save a post)
- Actions are sent to Reducers are functions which take Actions and payload as input and prepare a new immutable state
- effects don't change the state of the app
- switchMap don't wrap with Observable
- https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b
- https://blog.nrwl.io/ngrx-patterns-and-techniques-f46126e2b1e5