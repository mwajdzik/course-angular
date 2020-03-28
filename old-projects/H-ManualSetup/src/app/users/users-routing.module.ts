import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users.component';

const appRoutes: Routes = [
    {path: '', component: UsersComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: []
})
export class UsersRoutingModule {
}
